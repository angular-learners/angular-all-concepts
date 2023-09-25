import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent  implements OnInit{
  menuList:any[]=[];
    constructor(private userService:UserService){

    }
  ngOnInit(): void {
    this.getMenus();
  }


    getMenus(){
      this.userService.getAdminMenu().subscribe(
        {
          next:(res:any)=>{
            this.menuList=[...res.admin_menu];
            console.log(this.menuList);
          },
          error:(err)=>{
            console.log(err);
          }
        }
      )
    }
}
