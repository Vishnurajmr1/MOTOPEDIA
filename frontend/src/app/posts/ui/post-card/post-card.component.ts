import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IpostInterface } from '../../../../app/shared/types/post.Interface';
import { IUserDetails, IUserInfo } from '../../../../app/shared/types/user.Interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  @Input() post!: IpostInterface;
  @Input() currentUser: string | undefined;
  @Input() showAuthorDetails = true;
  @Input() showActions = true;
  @Input() isProfilePage: boolean = false;
  @Input() followers:[IUserInfo]|undefined
  @Output() like = new EventEmitter<{ postId: string; reactionType: string }>();
  @Output() follow = new EventEmitter<string>();
  @Output() comment = new EventEmitter<string>();
  @Output() showComments: boolean = false;
  // showSharePost: boolean = false;
  currentUserLiked: boolean = false;
  currentUserFollowing: boolean = false;
  followButton: boolean = true;
  @Output() showEditModal = new EventEmitter<{
    post: IpostInterface;
    actionType: string;
  }>();
  @Output() share: EventEmitter<string> =
    new EventEmitter<string>();
  showAuthorActions: boolean = false;
  showAuthorFunc() {
    if (this.isProfilePage) {
      this.showAuthorActions = true;
    }
  }
  editModal(post: IpostInterface, actionType: string) {
    this.showEditModal.emit({ post, actionType });
  }
  deleteModal(post: IpostInterface, actionType: string) {
    this.showEditModal.emit({ post, actionType });
  }

  ngOnInit() {
    if (this.post.authorId._id == this.currentUser) {
      this.followButton = false;
    }
    if(this.followers&& this.currentUser){
      this.currentUserFollowing=this.followers.some((follower:any)=>follower._id===this.post.authorId._id)
    }
    if (this.currentUser !== undefined) {
      this.currentUserLiked = this.post.likedBy.some(
        (res: { userId: string | undefined }) => res.userId === this.currentUser
      );
    }
  }
  addLike(postId: string, reactionType: string) {
    this.currentUserLiked = !this.currentUserLiked;
    this.like.emit({ postId, reactionType });
  }
  followUser(authorId: string) {
    this.follow.emit(authorId);
    this.currentUserFollowing = !this.currentUserFollowing;
  }
  toggleComment(postId: string) {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.comment.emit(postId);
    }
  }
  sharePost(postId: string) {
    // this.showSharePost = !this.showSharePost;
    // if (this.showSharePost) {
      this.share.emit(postId);
    // }
  }
}
