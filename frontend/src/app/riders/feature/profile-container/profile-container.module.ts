import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container.component';
import {ProfileContainerRoutingModule} from './profile-container-routing.module'
import { AsideModule } from "../../ui/aside/aside.module";
import { EditPostModule } from 'src/app/posts/ui/edit-post/edit-post.module';
import { EditProfileModule } from '../../ui/edit-profile/edit-profile.module';
import { ListPostModule } from "../../ui/list-post/list-post.module";
import { PostListModule } from 'src/app/posts/feature/post-list/post-list.module';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';


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
        ModalModule
    ]
})
export class ProfileContainerModule { }
