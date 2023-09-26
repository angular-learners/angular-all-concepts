import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList:any[]=[];
   constructor(private userService:UserService,private router:Router){

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

   edit(id:number){
     this.router.navigate(['update-account',id]);
   }

   deleteUser(id:number){
    this.userService.deleteUserById(id).subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.getAllUsers();
        },
        error:(err:any)=>{
          console.log(err);
        }
      }
    )
   }
}
