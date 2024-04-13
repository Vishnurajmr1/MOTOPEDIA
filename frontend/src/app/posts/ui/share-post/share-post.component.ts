import { Component, Input, SimpleChanges } from '@angular/core';
import { IpostInterface } from '../../../../app/shared/types/post.Interface';
import { IUserDetails } from 'src/app/shared/types/user.Interface';

@Component({
  selector: 'share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export class SharePostComponent {
  @Input() Post: IpostInterface | undefined;
  @Input() sharePostId: string | null = null;
  @Input()
  openModal!: boolean;
  @Input() ChatMembers: IUserDetails[] = [];
  ngOnInit(): void {
    console.log(this.ChatMembers);
    // console.log('here comes the share post details');
    // console.log(this.Post);
    // if (this.sharePostId) {
    //   console.log(this.sharePostId);
    //   this.openModal = true;
    // }
  }
  closeModal() {
    this.openModal = false;
  }
}
