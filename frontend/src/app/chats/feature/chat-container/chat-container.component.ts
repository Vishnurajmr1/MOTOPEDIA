import { Component, Input, inject } from '@angular/core';
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
  followers!: [IUserInfo];
  getChats!: ChatListItemInterface[];
  getChatDetail!: ChatListItemInterface;
  protected participant: any;
  messageRecieved = false;
  selectedChat: any;
  unreadMessagesCount: { [chatId: string]: number } = {};
  protected chatMessages!: ChatMessageInterface[];
  protected currentUser!: ICurrentUser;
  private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUser = res;
    });
  }
  ngOnInit() {
    this.chatService.connect();
    this.getCurrentUserChat();
    this.chatService.setCurrentUser(this.currentUser);
    this.userService.getConnection().subscribe((user) => {
      this.followers = user.connectionData[0].followers;
    });
  }
  onChatSelected(user: IUserDetails): void {
    this.selectedChat = user;
    console.log(user);
    this.messageRecieved = true;
    this.chatService.setCurrentParticipant(user._id);
    this.chatService.addUser();
    this.chatApiService
      .createUserChat(this.chatService.getParticipantId())
      .subscribe((res) => {
        this.getChatDetail = res.data;
        this.chatService.setChatRoom(res.data._id);
        this.chatApiService
          .getChatMessages(res.data._id)
          .subscribe((response) => {
            this.chatMessages = response.data;
          });
        console.log(this.chatMessages);
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
    console.log(this.getChatDetail);
    let chatId = this.getChatDetail._id;
    this.chatApiService.sendMessage(chatId, message).subscribe((res) => {
      this.chatMessages.push(res.data);
      // this.getCurrentUserChat();
    });
    this.chatService.getNewMessages().subscribe((res) => {
      console.log(res);
      this.chatMessages.push(res);
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
        const participants = response.data.participants.filter(
          (partcipant: any) =>
            partcipant._id.toString() !== this.currentUser.userId
        );
        const updatedData: ChatListItemInterface = {
          ...response.data,
          participants: participants,
        };
        this.getChats = [updatedData, ...this.getChats];
      });
    }
  }
  getCurrentUserChat() {
    this.chatApiService.getUserChats().subscribe((res) => {
      this.getChats = res.data.map((chat: ChatListItemInterface) => ({
        ...chat,
        participants: chat.participants.filter(
          (participant) =>
            participant._id.toString() !== this.currentUser.userId?.toString()
        ),
      }));
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
