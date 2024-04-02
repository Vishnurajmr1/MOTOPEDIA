import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { ChatService } from '../../data-access/chat.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  State,
  getCurrentUserData,
} from '../../../../app/auth/data-access/state';
import { ICurrentUser } from '../../../../app/auth/data-access/state/auth.reducer';
import { UserService } from '../../../../app/riders/data-access/user.service';
import { ChatApiService } from '../../data-access/chatApi.service';
import { IUserDetails, IUserInfo } from 'src/app/shared/types/user.Interface';
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from 'src/app/shared/types/chat.Interface';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
})
export class ChatContainerComponent {
  private chatService = inject(ChatService);
  private chatApiService = inject(ChatApiService);
  private userService = inject(UserService);
  currentUser$!: Observable<ICurrentUser>;
  openCreateChatModal: boolean = false;
  protected users = [];
  followers: IUserInfo[] = [];
  getChats: ChatListItemInterface[] = [];
  getChatDetail!: ChatListItemInterface;
  protected participantData: IUserDetails | undefined;
  messageRecieved = false;
  selectedChat: string = '';
  protected chatMessages: ChatMessageInterface[] = [];
  protected unreadMessages: ChatMessageInterface[] = [];
  protected currentUser!: ICurrentUser;
  private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUser = res;
    });
    this.onMessageRecieved();
  }
  ngOnInit() {
    this.chatService.connect();
    this.chatService.setCurrentUser(this.currentUser);
    this.chatService.addUser();
    this.userService.getConnection().subscribe((user) => {
      this.followers = user.connectionData[0].followers;
    });
    this.getCurrentUserChat();
  }
  onChatSelected(value: { participant: IUserDetails; chatId: string }): void {
    this.selectedChat = value.chatId;
    console.log(value);
    this.participantData = value.participant;
    this.messageRecieved = true;
    this.chatService.setCurrentParticipant(value.participant._id);
    this.chatService.setChatRoom(this.selectedChat);
    this.unreadMessages = this.unreadMessages.filter(
      (msg) => msg.chat !== this.selectedChat
    );
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
    console.log('Message received:', message);
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
      console.log('new socket event emmited here ', message);
      if (message.chat !== this.selectedChat) {
        console.log('hello how are yououuo');
        this.unreadMessages.push(message);
      }
      this.updateLastChatMessage(message.chat || ' ', message);
      console.log(this.unreadMessages);
    });
  }
  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
