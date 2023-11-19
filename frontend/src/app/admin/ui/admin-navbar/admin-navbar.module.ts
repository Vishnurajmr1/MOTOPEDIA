import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AdminNavbarComponent]
})
export class AdminNavbarModule { }
