import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList:any[]=[];
   constructor(private userService:UserService){

   }
  ngOnInit(): void {
    this.getAllUsers();
  }


   getAllUsers(){
    this.userService.getAllUsers().subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.userList=[...res];
        },
        error:(err:any)=>{
          console.log(err);
        }
      }
    )
   }
}
