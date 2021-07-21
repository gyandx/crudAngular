import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApiService, Manager } from '../../service/api-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  toggleAlert: boolean = false; // used to toggle the alert component
  errorMsg: string; // used to store error messages
  managerData: Manager[] = [];
  alertColor: string; // used to dynamically change the alert container color

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // getting data using manager resolver
    this.activatedRoute.data.subscribe((data: Data) => {
      this.managerData = data['managerData'];
    })
    this.createSignInForm();
  }

  // function to create signIn reactive form
  createSignInForm(): void {
    this.signInForm = new FormGroup({
      'email': new FormControl('', [Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.required]),
      'password': new FormControl('', Validators.required)
    })
  }

  // using getter method to get the formControls of the form
  get formControl(): any {
    return this.signInForm.controls;
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

  // function for timeout
  timeOut() {
    setTimeout(() => {
      this.toggleAlert = false;
    }, 2000);
  }

  // function to submit form on click
  submitForm(form): void {
    // checking form is valid or not
    if (form?.invalid) {
      this.validateAllFields(form);
      // different scenario's
      if (form.value.email === "" && form.value.password === "") {
        this.toggleAlert = true;
        this.alertColor = "alert-danger";
        this.errorMsg = "Please Enter email and password";
        this.timeOut();
      } else if (form.value.email === "") {
        this.toggleAlert = true;
        this.alertColor = "alert-danger";
        this.errorMsg = "Please Enter email";
        this.timeOut();
      } else if (form.value.password === "") {
        this.toggleAlert = true;
        this.alertColor = "alert-danger";
        this.errorMsg = "Please Enter password";
        this.timeOut();
      }
    }
    // if form is valid
    else {
      let enteredPassword = form.value.password;
      // checking if entered email is present or not.
      const result = this.managerData.filter(data => data[`email`] === form.value.email);
      if (result.length) {
        let password = window.atob(result[0][`password`]);
        if (password !== enteredPassword) {
          this.toggleAlert = true;
          this.alertColor = "alert-danger";
          this.errorMsg = "Enter correct password";
          this.timeOut();
        } else {
          this.toggleAlert = true;
          this.alertColor = "alert-success";
          this.errorMsg = "Welcome!!!Successfully logged in.";
          this.timeOut();
          this.apiService.loginData(result[0]);
          this.router.navigate(['/employee']); // navigating to home page is email & password matches.
        }
      } else {
        this.toggleAlert = true;
        this.errorMsg = "Email does not exist";
        this.alertColor = "alert-danger";
        this.timeOut();
      }
    }
  }

}
