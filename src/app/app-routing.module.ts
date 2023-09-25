import { UserHomeModule } from './modules/user-home/user-home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { CreateAccountComponent } from './shared/components/create-account/create-account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  {path:'',loadChildren:()=>import("./modules/user-home/user-home.module").then(m=>m.UserHomeModule) },
  {path:'',loadChildren:()=>import("./modules/admin-home/admin-home.module").then(m=>m.AdminHomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
