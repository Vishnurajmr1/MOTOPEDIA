import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContainerComponent } from './profile-container.component';
import {ProfileContainerRoutingModule} from './profile-container-routing.module'


@NgModule({
  declarations: [
    ProfileContainerComponent
  ],
  imports: [
    CommonModule,
    ProfileContainerRoutingModule
    
  ],
})
export class ProfileContainerModule { }
