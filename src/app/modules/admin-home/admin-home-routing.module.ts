import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'admin-home',component:AdminHomeComponent,
   children:[
    {path:'users',component:UsersComponent}
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
