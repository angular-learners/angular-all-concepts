import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FacebookConstants } from '../../constants/facebook.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usersList: any[] = [];
  message: string = "";
  isLoggedIn: boolean = false;


  constructor(private userService: UserService,private router:Router) { }


  ngOnInit(): void {
    this.onInitLoginForm();
    this.getAllUsers();
  }


  onInitLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.usersList = [...res];
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }

  login() {
    const userValues = this.loginForm.getRawValue();
   

    for (let i = 0; i < this.usersList.length; i++) {
      let { email, password } = this.usersList[i];
      if (userValues.email == email && userValues.password == password) {
        this.isLoggedIn = true;
        break;
      } else {
        this.isLoggedIn = false;
      }
    }

    // this.usersList.filter((user: any) => {

    // })
    if (this.isLoggedIn) {
      this.message = FacebookConstants.LOGIN_SUCCESS;
       setTimeout(()=>{
        this.router.navigate(['user-home']);
       },3000)
    } else {
      this.message = FacebookConstants.LOGIN_FAILURE;
    }
  }

  get getFacebookConstants() {
    return FacebookConstants;
  }
}
