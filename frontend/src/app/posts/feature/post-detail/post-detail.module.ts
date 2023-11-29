import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail.component';
import { PostCardModule } from "../../ui/post-card/post-card.module";



@NgModule({
    declarations: [
        PostDetailComponent
    ],
    imports: [
        CommonModule,
        PostCardModule
    ]
})
export class PostDetailModule { }
