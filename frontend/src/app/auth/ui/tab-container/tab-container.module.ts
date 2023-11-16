import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerComponent } from './tab-container.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        TabContainerComponent
    ],
    exports: [TabContainerComponent],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class TabContainerModule { }
