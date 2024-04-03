import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {RouterModule} from '@angular/router'
import { SearchContainerModule } from 'src/app/riders/feature/search-container/search-container.module';
import { NotificationModule } from '../notification/notification.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchContainerModule,
    NotificationModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
