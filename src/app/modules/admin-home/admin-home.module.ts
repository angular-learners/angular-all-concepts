import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
