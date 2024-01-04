import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPostComponent {
@Input() posts!:IpostInterface[];
showButton:boolean=false;
ngOnInit():void{
  console.log(this.posts);
}
showEditButton(){
  this.showButton=true;
}
}
