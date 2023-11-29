import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IpostInterface } from 'src/app/shared/types/post.Interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input() post!: IpostInterface;
  ngAfterViewInit(){
    console.log(this.post);
  }
}
