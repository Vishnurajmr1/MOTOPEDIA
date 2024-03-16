import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAsideComponent } from './admin-aside.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminAsideComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  exports:[AdminAsideComponent]
})
export class AdminAsideModule { }
