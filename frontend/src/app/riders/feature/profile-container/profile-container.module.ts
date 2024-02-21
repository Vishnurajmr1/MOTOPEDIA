import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container.component';
import {ProfileContainerRoutingModule} from './profile-container-routing.module'
import { AsideModule } from "../../ui/aside/aside.module";
import { EditPostModule } from '../../../posts/ui/edit-post/edit-post.module';
import { EditProfileModule } from '../../ui/edit-profile/edit-profile.module';
import { ListPostModule } from "../../ui/list-post/list-post.module";
import { PostListModule } from '../../../posts/feature/post-list/post-list.module';
import { ModalModule } from '../../../shared/ui/modal/modal.module';
import { FollowersListModule } from '../../ui/followers-list/followers-list.module';


@NgModule({
    declarations: [
        ProfileContainerComponent
    ],
    imports: [
        CommonModule,
        ProfileContainerRoutingModule,
        AsideModule,
        EditPostModule,
        EditProfileModule,
        ListPostModule,
        PostListModule,
        ModalModule,
        FollowersListModule
    ]
})
export class ProfileContainerModule { }
