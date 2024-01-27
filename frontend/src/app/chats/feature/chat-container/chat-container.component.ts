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

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
})
export class ChatContainerComponent {
  private chatService = inject(ChatService);
  private userService=inject(UserService);
  currentUser$!: Observable<ICurrentUser>;
  protected users = [];
  followers!:[ICurrentUser];
  protected currentUserId: string = '';
  private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUserId = res?.userId || '';
    });
    console.log(this.currentUserId);
  }
  ngOnInit(){
    this.chatService.connect();
    this.chatService.setCurrentUser(this.currentUserId);
    const currentUser=this.chatService.getCurrentUserId()
    console.log(currentUser)
    this.chatService.addUser();
    this.userService.getConnection().subscribe((user)=>{
     this.followers=user.connectionData[0].followers
     console.log(this.followers);
    })
  }

  ngOnDestroy(){
    this.chatService.disconnect();
  }
}
