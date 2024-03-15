import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserInfo } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css'],
})
export class CreateChatComponent {
  @Input()
  modalOpen!: boolean;
  @Output() closeCreateChatComponent = new EventEmitter<void>();
  closemodalButton: boolean = true;
  @Input()
  followers!: IUserInfo[];
  @Output() followerSelected:EventEmitter<IUserInfo>=new EventEmitter<IUserInfo>();
  followerName:string=''
  selectedFollower:IUserInfo|null=null;
  showFollowers: boolean = false;
  closeModal() {
    this.closemodalButton != this.closemodalButton;
    this.closeCreateChatComponent.emit();
  }
  toggleFollowersList() {
    this.showFollowers = true;
  }
  selectFollower(follower:IUserInfo){
    this.selectedFollower=follower
    this.followerName=follower.firstName
  }

  createChat(){
    if(this.selectedFollower){
      this.followerSelected.emit(this.selectedFollower);
      this.selectedFollower=null;
      this.closeModal()
    }
  }
}
