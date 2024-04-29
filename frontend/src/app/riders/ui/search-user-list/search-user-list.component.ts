import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UserDoc } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'search-user-list',
  templateUrl: './search-user-list.component.html',
  styleUrls: ['./search-user-list.component.css']
})
export class SearchUserListComponent {
@Input()userData:UserDoc[]=[];
@Output()followerId:EventEmitter<string>=new EventEmitter<string>()
followUser(userId:string){
  console.log(userId)
  this.followerId.emit(userId)
}
}
