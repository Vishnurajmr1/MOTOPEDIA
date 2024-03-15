import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    FooterModule
  ]
})
export class HomeModule { }
