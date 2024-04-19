import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { SocketService } from '../../../shared/data-access/global/socket.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  State,
  getCurrentUserData,
} from '../../../../app/auth/data-access/state';
import { ICurrentUser } from '../../../../app/auth/data-access/state/auth.reducer';
import { UserService } from '../../../../app/riders/data-access/user.service';
import { ChatApiService } from '../../data-access/chatApi.service';
import { IUserDetails, IUserInfo } from '../../../../app/shared/types/user.Interface';
import {
  ChatListItemInterface,
  ChatMessageInterface,
  VideoCallEvent,
} from '../../../../app/shared/types/chat.Interface';
import { ChatDetailComponent } from '../../ui/chat-detail/chat-detail.component';
import { CallService } from '../../data-access/call.service';
import { VideoCallComponent } from '../../ui/video-call/video-call.component';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
})
export class ChatContainerComponent {
  private chatService = inject(SocketService);
  private chatApiService = inject(ChatApiService);
  private userService = inject(UserService);
  private callService = inject(CallService);
  currentUser$!: Observable<ICurrentUser>;
  openCreateChatModal: boolean = false;
  protected users = [];
  followers: IUserInfo[] = [];
  getChats: ChatListItemInterface[] = [];
  getChatDetail!: ChatListItemInterface;
  protected participantData: IUserDetails | undefined;
  messageRecieved = false;
  selectedChat: string = '';
  openVideoCall:boolean=false;
  protected chatMessages: ChatMessageInterface[] = [];
  protected unreadMessages: ChatMessageInterface[] = [];
  protected currentUser!: ICurrentUser;
  private ngUnsubscribe$ = new Subject<void>();
  @ViewChildren('chatDetail')
  chatDetailComponent!: ChatDetailComponent;
  @ViewChildren(VideoCallComponent)videoCallComponent!:VideoCallComponent;
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUser = res;
    });
    this.onMessageRecieved();
  }
  remoteVideoElement!:ElementRef<any>
  localVideoElement!:ElementRef<HTMLVideoElement>
  ngOnInit() {
    this.userService.getConnection().subscribe((user) => {
      console.log(user)
      this.followers = user.data[0].followers;
    });
    const storedUnreadMessages = localStorage.getItem('unreadMessages');
    if (storedUnreadMessages) {
      this.unreadMessages = JSON.parse(storedUnreadMessages);
    }
    this.getCurrentUserChat();
  }
 
  onChatSelected(value: { participant: IUserDetails; chatId: string }): void {
    this.selectedChat = value.chatId;
    this.participantData = value.participant;
    this.messageRecieved = true;
    this.chatService.setCurrentParticipant(value.participant._id);
    this.chatService.setChatRoom(this.selectedChat);
    const storedUnreadMessages = localStorage.getItem('unreadMessages');
    if (storedUnreadMessages) {
      this.unreadMessages = JSON.parse(storedUnreadMessages);
      this.unreadMessages = this.unreadMessages.filter(
        (msg) => msg.chat !== this.selectedChat
      );
      localStorage.setItem(
        'unreadMessages',
        JSON.stringify(this.unreadMessages)
      );
    }
    this.chatApiService
      .getChatMessages(this.selectedChat)
      .subscribe((response) => {
        this.chatMessages = response.data;
      });
  }
  CallCreateUserModal() {
    this.openCreateChatModal = true;
  }
  closeCreateChatModal() {
    this.openCreateChatModal = false;
  }
  onMessageSend(message: string): void {
    let chatId = this.selectedChat;
    this.chatApiService.sendMessage(chatId, message).subscribe((res) => {
      console.log(res);
      this.updateLastChatMessage(res.data.chat, res.data);
    });
  }

  isSendByUser(msg: any) {
    return msg.sender._id === this.chatService.getCurrentUserId();
  }
  handleFollowerSelected(follower: IUserInfo) {
    this.createOneToOneChat(follower);
  }
  createOneToOneChat(follower: IUserInfo) {
    const existingChat = this.getChats.find((chat) => {
      const participants = chat.participants.map((participant) =>
        participant._id.toString()
      );
      return participants.includes(follower._id.toString());
    });
    if (!existingChat) {
      this.chatApiService.createUserChat(follower._id).subscribe((response) => {
        this.updatedChatsList(response.data);
      });
    } else {
      console.log('Chat already exists');
    }
  }
  getCurrentUserChat() {
    this.chatApiService.getUserChats().subscribe((res) => {
      console.log(res);
      res.data.forEach((chat: ChatListItemInterface) =>
        this.updatedChatsList(chat)
      );
    });
  }

  private updatedChatsList(chat: ChatListItemInterface) {
    const participants = chat.participants.filter(
      (partcipant) => partcipant._id.toString() !== this.currentUser.userId
    );
    const updatedData: ChatListItemInterface = {
      ...chat,
      participants: participants,
    };
    this.getChats = [updatedData, ...this.getChats];
  }
  private updateLastChatMessage(
    chatToUpdateId: string,
    message: ChatMessageInterface
  ) {
    const chatToUpdateIndex = this.getChats.findIndex(
      (chat) => chat._id === chatToUpdateId
    )!;
    if (chatToUpdateIndex !== -1) {
      const chatToUpdate = this.getChats[chatToUpdateIndex];
      chatToUpdate.lastMessage = message;
      chatToUpdate.updatedAt = message.updatedAt;
      this.getChats = [
        chatToUpdate,
        ...this.getChats.filter((chat) => chat._id !== chatToUpdateId),
      ];
      if (this.selectedChat == chatToUpdateId) {
        this.chatMessages.push(message);
      }
    }
  }
  onMessageRecieved() {
    this.chatService.getNewMessage().subscribe((message) => {
      if (message.chat !== this.selectedChat) {
        this.unreadMessages.push(message);
        localStorage.setItem(
          'unreadMessages',
          JSON.stringify(this.unreadMessages)
        );
      }
      this.updateLastChatMessage(message.chat || ' ', message);
      console.log(this.unreadMessages);
    });
  }

  receiveRemoteVideo(remoteVideoElement:ElementRef<any>){
    console.log(remoteVideoElement)
    this.remoteVideoElement=remoteVideoElement
    this.makeCall();
  }
  makeVideoCall(chatId:string): void {
    this.openVideoCall=!this.openVideoCall;
    console.log('hello particular chat is clicked',chatId);
    console.log(this.remoteVideoElement)
    // this.createVideoContainer();
  }

  public async makeCall(): Promise<void> {
    if (this.remoteVideoElement !== undefined) {
      console.log(this.remoteVideoElement);
      await this.callService.makeCall(this.remoteVideoElement);
    } else {
      console.log('error found haaaa');
    }
  }

  private async _handleMessage(data: any): Promise<void> {
    switch (data.type) {
      case 'offer':
        await this.callService.handleOffer(data.offer, this.remoteVideoElement);
        break;
      case 'answer':
        await this.callService.handleAnswer(data.answer);
        break;
      case 'candidate':
        await this.callService.handleCandidate(data.candidate);
        break;
      default:
        break;
    }
  }

  createVideoContainer(): void {
    console.log(this.chatDetailComponent);
    // this.remoteVideoElement = this.chatDetailCompone;
    // console.log(this.remoteVideoElement);
    this.chatService.getNewVideoMessages().subscribe((payload) => {
      console.log(payload);
      this._handleMessage(payload);
    });
  }

  ngOnDestroy() {
    // this.chatService.disconnect();
  }
}
