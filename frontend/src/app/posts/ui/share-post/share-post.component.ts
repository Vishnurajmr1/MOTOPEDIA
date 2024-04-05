import { Component, Input } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export class SharePostComponent {
  @Input() Post: IpostInterface | undefined;

  ngOnChanges(): void {
    console.log('here comes the share post details');
    console.log(this.Post);
  }
}
