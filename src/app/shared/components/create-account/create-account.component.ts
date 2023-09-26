import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookConstants } from '../../constants/facebook.constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm!: FormGroup;
  message: string = "";
  selectedId: number = 0;
  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private route: ActivatedRoute) {
    this.getUserId();
  }
  ngOnInit(): void {
    this.onInitCreateAccountForm();
    this.getUser();
  }

  getUserId() {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onInitCreateAccountForm() {
    this.createAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumberList: this.fb.array([
        this.fb.group({
          mobileNumber: ['',Validators.required]
        })
      ]),
      createdDate: [new Date()],
      updatedDate: [''],
      status: ['active'],
      dob: ['', Validators.required],
      addressList: this.fb.array([
        this.fb.group({
          city: ['',Validators.required],
          pincode: ['',Validators.required],
          state: ['',Validators.required],
          country: ['',Validators.required],
          landmark: ['',Validators.required]
        })
      ])
    })
  }

  feildError(fieldName: string) {
    return this.createAccountForm.get(fieldName)?.invalid && this.createAccountForm.get(fieldName)?.touched;
  }
  feildTypeError(fieldName: string, errorType: string) {
    return this.createAccountForm.get(fieldName)?.errors?.[errorType];
  }
  mobileNumberValidations(index: number) {
    let formArray = this.createAccountForm.get('mobileNumberList') as FormArray;
    const formGroup = formArray.controls[index] as FormGroup;
    return formGroup;
  }

  addressValidations(index:number){
    let formArray = this.createAccountForm.get('addressList') as FormArray;
    const formGroup = formArray.controls[index] as FormGroup;
    return formGroup;
  }

  get getMobileNumbers(): FormArray {
    return this.createAccountForm.get('mobileNumberList') as FormArray;
  }

  get getAddresses(): FormArray {
    return this.createAccountForm.get('addressList') as FormArray;
  }

  createNewMobileNumber(): FormGroup {
    return this.fb.group({
      mobileNumber: ['',Validators.required]
    })
  }

  createNewAddress(): FormGroup {
    return this.fb.group({
      city: ['',Validators.required],
      pincode: ['',Validators.required],
      state: ['',Validators.required],
      country: ['',Validators.required],
      landmark: ['',Validators.required]
    })
  }

  addMobileNumber() {
    this.getMobileNumbers.push(this.createNewMobileNumber());
  }

  addAddress() {
    this.getAddresses.push(this.createNewAddress());
  }

  removeMobileNumber(index: number) {
    this.getMobileNumbers.removeAt(index);
  }

  removeAddress(index: number) {
    this.getAddresses.removeAt(index);
  }

  patchMobileNumbers(res: any) {
    const formArray = this.createAccountForm.get('mobileNumberList') as FormArray;

    while (formArray.length < res.mobileNumberList.length) {
      formArray.push(this.createNewMobileNumber())
    }

    res.mobileNumberList.forEach((element: any, index: number) => {
      let formControl = formArray.at(index);
      formControl.get('mobileNumber')?.patchValue(element.mobileNumber);
    });

  }

  patchAddresses(res: any) {
    const formArray = this.createAccountForm.get('addressList') as FormArray;

    while (formArray.length < res.addressList.length) {
      formArray.push(this.createNewAddress())
    }

    res.addressList.forEach((element: any, index: number) => {
      let formControl = formArray.at(index);
      formControl.get('city')?.patchValue(element.city);
      formControl.get('pincode')?.patchValue(element.pincode);
      formControl.get('state')?.patchValue(element.state);
      formControl.get('country')?.patchValue(element.country);
      formControl.get('landmark')?.patchValue(element.landmark);
    });

  }

  patchUser(res: any) {
    const { firstName, lastName, email, password, createdDate, updatedDate, status, dob } = res;
    this.createAccountForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      email:email,
      password: password,
      mobileNumberList: this.patchMobileNumbers(res),
      createdDate: createdDate,
      updatedDate: new Date(),
      status: status,
      dob: dob,
      addressList:this.patchAddresses(res)
    })
  }




  getUser() {
    this.userService.getUserById(this.selectedId).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.patchUser(res);
          // this.message=FacebookConstants.USER_CREATED;
          // setTimeout(()=>{
          //   this.router.navigate(['login']);

          // },3000)
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }



  saveAccount() {
    const form = this.createAccountForm.getRawValue();
    if(this.selectedId>0){
      this.userService.updateUserById(this.selectedId,form).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            this.message = FacebookConstants.USER_UPDATED;
            setTimeout(() => {
              this.router.navigate(['admin-home']);
            }, 3000)
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    }else{
      this.userService.createAccount(form).subscribe(
        {
          next: (res: any) => {
            console.log(res);
            this.message = FacebookConstants.USER_CREATED;
            setTimeout(() => {
              this.router.navigate(['login']);
  
            }, 3000)
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    }
  }

   
  
 
}
