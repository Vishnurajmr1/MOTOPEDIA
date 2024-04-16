import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { PostCardModule } from "../../ui/post-card/post-card.module";
import { PostDetailRoutingModule } from './post-detail-routing.module';



@NgModule({
    declarations: [
        PostDetailComponent
    ],
    imports: [
        CommonModule,
        PostCardModule,
        PostDetailRoutingModule
    ],
    exports:[
        PostDetailComponent
    ]
})
export class PostDetailModule { }
