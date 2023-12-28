import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container.component';
import {ProfileContainerRoutingModule} from './profile-container-routing.module'
import { AsideModule } from "../../ui/aside/aside.module";


@NgModule({
    declarations: [
        ProfileContainerComponent
    ],
    imports: [
        CommonModule,
        ProfileContainerRoutingModule,
        AsideModule
    ]
})
export class ProfileContainerModule { }
