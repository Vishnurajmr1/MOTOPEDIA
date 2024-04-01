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
  followers: IUserInfo[] = [];
  getChats: ChatListItemInterface[] = [];
  getChatDetail!: ChatListItemInterface;
  protected participantData: IUserDetails | undefined;
  messageRecieved = false;
  selectedChat: string = '';
  protected chatMessages: ChatMessageInterface[] = [];
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
    this.chatService.setCurrentUser(this.currentUser);
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
    this.chatService.addUser();
    this.chatService.setChatRoom(this.selectedChat);
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
      this.chatMessages.push(res.data);
      this.updateLastChatMessage(chatId, res.data);
    });
    // this.chatService.getNewMessages().subscribe((res) => {
    //   console.log(res);
    //   this.chatMessages.push(res);
    // });
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
    console.log(participants);
    const updatedData: ChatListItemInterface = {
      ...chat,
      participants: participants,
    };
    this.getChats = [updatedData, ...this.getChats];
    console.log('Here something wrong happens');
    console.log(this.getChats);
    console.log('Here is the end of that wrong thing');
  }
  private updateLastChatMessage(
    chatToUpdateId: string,
    message: ChatMessageInterface
  ) {
    const chatToUpdate = this.getChats.find(
      (chat) => chat._id === chatToUpdateId
    )!;
    chatToUpdate.lastMessage = message;
    chatToUpdate.updatedAt = message.updatedAt;
    chatToUpdate.participants.filter((partcipant) => partcipant._id.toString() !== this.currentUser.userId)
    this.getChats = [
      chatToUpdate,
      ...this.getChats.filter((chat) => chat._id !== chatToUpdateId),
    ];
    console.log(this.getChats);
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
