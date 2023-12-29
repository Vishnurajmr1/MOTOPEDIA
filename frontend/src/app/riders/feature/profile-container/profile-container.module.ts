import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container.component';
import {ProfileContainerRoutingModule} from './profile-container-routing.module'
import { AsideModule } from "../../ui/aside/aside.module";
import { DisplayContainerModule } from '../../ui/display-container/display-container.module';


@NgModule({
    declarations: [
        ProfileContainerComponent
    ],
    imports: [
        CommonModule,
        ProfileContainerRoutingModule,
        AsideModule,
        DisplayContainerModule
    ]
})
export class ProfileContainerModule { }
