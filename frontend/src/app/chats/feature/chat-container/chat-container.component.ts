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
import { ChatListItemInterface, ChatMessageInterface } from 'src/app/shared/types/chat.Interface';

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
  protected participant: any;
  messageRecieved = false;
  selectedChat: any;
  protected chatMessages!: ChatMessageInterface[];
  protected currentUser!: ICurrentUser;
  private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUser= res;
    });
  }
  onChatSelected(chat: IUserDetails): void {
    this.selectedChat = chat;
    console.log(chat)
    this.messageRecieved = true;
    this.chatService.setCurrentParticipant(chat._id);
    this.chatService.addUser();
    this.chatApiService.createUserChat(this.chatService.getParticipantId()).subscribe((res)=>{
      this.chatService.setChatRoom(res.data._id)
      this.chatApiService.getChatMessages(res.data._id).subscribe((response)=>{
        this.chatMessages=response.data
      })
      console.log(this.chatMessages)
    })
  }
  CallCreateUserModal() {
    this.openCreateChatModal = true;
  }
  closeCreateChatModal() {
    this.openCreateChatModal = false;
  }
  onMessageSend(message: string): void {
    console.log('Message received:', message);
    this.chatService.sendMessage(message);
  }
  isSendByUser(msg: any) {
    console.log(msg);
    return msg.sender._id === this.chatService.getCurrentUserId();
  }
  handleFollowerSelected(follower: IUserInfo) {
    this.createOneToOneChat(follower);
  }
  createOneToOneChat(follower: IUserInfo) {
    const existingChat=this.getChats.find(chat=>{
      const participants=chat.participants.map(participant=>participant._id.toString());
      return participants.includes(follower._id.toString());
    })
    if(!existingChat){
      this.chatApiService.createUserChat(follower._id).subscribe((response) => {
        const participants=response.data.participants.filter((partcipant:any)=>partcipant._id.toString()!==this.currentUser.userId)
        const updatedData:ChatListItemInterface={
          ...response.data,
          participants:participants
        }
        this.getChats = [updatedData, ...this.getChats]
      });
    }
  }
  getCurrentUserChat() {
    this.chatApiService.getUserChats().subscribe((res) => {
      this.getChats = res.data.map((chat:ChatListItemInterface)=>({
        ...chat,
        participants:chat.participants.filter(participant=>participant._id.toString()!==this.currentUser.userId?.toString())
      }));
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
  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
