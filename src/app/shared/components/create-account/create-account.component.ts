import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookConstants } from '../../constants/facebook.constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
 createAccountForm!:FormGroup;
  message: string="";
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) {

  }
  ngOnInit(): void {
     this.onInitCreateAccountForm();
  }

  onInitCreateAccountForm(){
    this.createAccountForm=this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      mobileNumberList: this.fb.array([
        this.fb.group({
          mobileNumber:['']
        })
      ]),
      createdDate: [''],
      updatedDate: [''],
      status: ['active'],
      dob: [''],
      addressList: this.fb.array([
        this.fb.group({
          city: [''],
          pincode: [''],
          state: [''],
          country:[''],
          landmark: ['']
        })
      ])
    })
  }

    get  getMobileNumbers():FormArray{
      return this.createAccountForm.get('mobileNumberList') as FormArray;
    }

    get getAddresses():FormArray{
      return this.createAccountForm.get('addressList') as FormArray;
    }

    createNewMobileNumber():FormGroup{
       return this.fb.group({
         mobileNumber:['']
       })
    }

    createNewAddress():FormGroup{
      return this.fb.group({
        city: [''],
        pincode: [''],
        state: [''],
        country:[''],
        landmark: ['']
      })
    }

    addMobileNumber(){
      this.getMobileNumbers.push(this.createNewMobileNumber());
    }

    addAddress(){
      this.getAddresses.push(this.createNewAddress());
    }

    removeMobileNumber(index:number){
      this.getMobileNumbers.removeAt(index);
    }

    removeAddress(index:number){
      this.getAddresses.removeAt(index);
    }

    saveAccount(){
      const form=this.createAccountForm.getRawValue();
      this.createAccountForm.get('createdDate')?.setValue(new Date());
        this.userService.createAccount(form).subscribe(
          {
            next:(res:any)=>{
              console.log(res);
              this.message=FacebookConstants.USER_CREATED;
              setTimeout(()=>{
                this.router.navigate(['login']);

              },3000)
            },
            error:(err:any)=>{
              console.log(err);
            }
          }
        )
    }
}
