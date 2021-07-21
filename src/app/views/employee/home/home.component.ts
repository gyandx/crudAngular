import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ApiService, Employee, Manager } from '../../service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  employeeForm: FormGroup;
  employeeData: Employee[];
  managerData: Manager[];
  modalText: string; // variable used to store modalText
  employeeId: number; // variable used to store employeeId
  employeeDetails: Employee;
  filterString: string = '';
  chart: any = []; // array used to store chart
  chartData: any = []; // variable used to store chartData

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.createEmployeeForm();
    this.getAllEmployees();
    this.getAllManagers();
  }

  // function used to generate chart
  chartService(): any{
    this.chart = new Chart('myChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Employee',
          'Manager'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: this.chartData,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  // function to create employee form
  createEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'lastName': new FormControl('', [Validators.required, Validators.maxLength(15)]),
      'address': new FormControl('', [Validators.required]),
      'dob': new FormControl('', [Validators.required, this.checkDate.bind(this)]),
      'mobile': new FormControl('', [Validators.pattern('[0-9 ]{10}'), Validators.required]),
      'city': new FormControl('', Validators.required)
    })
  }

  // using getter method to get the formControls of the form
  get formControl(): any{
    return this.employeeForm.controls;
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

  // function to getAllEmployees
  getAllEmployees(): any{
    this.apiService.getEmployees().subscribe(res => {
      this.employeeData = res;
      this.chartData.push(this.employeeData.length);
    })
  }

  // function to getAllManagers
  getAllManagers(): any{
    this.apiService.getManagers().subscribe(res => {
      this.managerData = res;
      this.chartData.push(this.managerData.length);
      this.chartService();
    })
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

  // function to submitForm
  submitForm(form): void{
    // checking form is valid or not
    if(form.invalid){
      this.validateAllFields(form);
      return;
    }else{
      // api to add new employee according to condition
      if(this.modalText === 'Add Employee'){
        this.apiService.addEmployee(form.value).subscribe(res => {
          this.apiService.getEmployeeCount();
        });
      }
      // api to update existing employee
      else{
        this.apiService.updateEmployee(this.employeeId, form.value).subscribe(res => {
          console.log(res);
        })
      }
    }
  }

  // function to get data of modal
  openModal(text: string, employee?: Employee){
    // checking condition is add or edit
    if(text === 'Add Employee'){
      this.modalText = text;
    }else{
      this.employeeId = employee?.id;
      this.employeeDetails = employee;
      // patching the value of employee to employeeForm
      this.employeeForm.patchValue({
        'firstName': this.employeeDetails.firstName,
        'lastName': this.employeeDetails.lastName,
        'address': this.employeeDetails.address,
        'dob': this.employeeDetails.dob,
        'mobile': this.employeeDetails.mobile,
        'city': this.employeeDetails.city
      })
    }
  }

  // function to getEmployeeId
  getEmployeeId(id: number){
    this.employeeId = id;
  }

  // function to delete employee
  deleteEmployee(): void{
    // const index = this.employeeData.findIndex(res => res.id === this.employeeId);
    this.apiService.deleteEmployee(this.employeeId).subscribe(res => {
      console.log(res);
    })
  }

  // function to logOut
  logOut(){
    this.apiService.logOut();
    this.router.navigate(['/manager']);
  }

}
