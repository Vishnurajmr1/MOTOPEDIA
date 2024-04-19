import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatContainerComponent } from './chat-container.component';
import { AsideModule } from "../../ui/aside/aside.module";
import { ChatContainerRoutingModule } from './chat-container-routing.module';
import { ChatDetailModule } from '../../ui/chat-detail/chat-detail.module';
import { SearchUserModule } from '../../ui/search-user/search-user.module';
import { CreateChatModule } from '../../ui/create-chat/create-chat.module';
import { VideoCallModule } from '../../ui/video-call/video-call.module';


@NgModule({
    declarations: [
        ChatContainerComponent
    ],
    imports: [
        CommonModule,
        AsideModule,
        ChatContainerRoutingModule,
        ChatDetailModule,
        SearchUserModule,
        CreateChatModule,
        VideoCallModule
    ],
    exports:[
        ChatContainerComponent
    ]
})
export class ChatContainerModule { }
