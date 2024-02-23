import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {RouterModule} from '@angular/router'
import { SearchContainerModule } from 'src/app/riders/feature/search-container/search-container.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchContainerModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
