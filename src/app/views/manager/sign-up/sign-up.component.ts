import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApiService, Manager } from '../../service/api-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  managerData: Manager[];
  managerCount: number = 0;
  toggleAlert: boolean = false; // used to toggle the alert component
  errorMsg: string;  // used to store error messages
  alertColor: string;  // used to dynamically change the alert container color

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // getting data using manager resolver
    this.activatedRoute.data.subscribe((data: Data) => {
      this.managerData = data['managerData'];
      this.managerCount = this.managerData.length;
      this.apiService.managerCount.next(this.managerCount);
    });
    this.createSignUpForm();
  }

  // function to create signUp reactive form
  createSignUpForm(): void{
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.required]),
      'firstName': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'lastName': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(7)]),
      'address': new FormControl('', [Validators.required]),
      'dob': new FormControl('', [Validators.required, this.checkDate.bind(this)])
    })
  }

  // using getter method to get the formControls of the form
  get formControl(): any{
    return this.signUpForm.controls;
  }

  // function to check current date with entered date i.e custom validator
  checkDate(control: FormControl): {[s: string]: boolean}{
    let currentDate = new Date();
    let enteredDate = new Date(control.value);
    if(enteredDate > currentDate){
      return {'dateIsInvalid': true}
    }else{
      return null;
    }
  }

  // function used to validate the form fields
  validateAllFields(formGroup: FormGroup): void {
    Object.keys(this.formControl).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  // function to submit form on click
  submitForm(form): void{
    // checking form is valid or not
    if(form.invalid){
      this.validateAllFields(form);
      return;
    }else{
      // checking is email is present or not
      for(const data of this.managerData){
        if(data["email"] === form.value.email){
          this.toggleAlert = true;
          this.alertColor = "alert-danger";
          this.errorMsg = "Email already exist, please choose another email";
          setTimeout(() => { this.toggleAlert = false; }, 2000);
          return;
        }
      }
      form.value.password = window.btoa(form.value.password);
      form.value.id = this.managerCount + 1;
      this.apiService.addManager(form.value).subscribe(res => {
        this.apiService.getManagerCount(res);
        this.router.navigate(['../sign-in'], {relativeTo: this.activatedRoute});
      })
    }
  }

}
