import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

export interface Employee{
  id: number,
  firstName: string,
  lastName: string,
  address: string,
  dob: string,
  mobile: string,
  city: string
}

export interface Manager{
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  address: string,
  dob: string
}

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  // use of BehaviorSubject to store employee & manager count
  employeeCount = new BehaviorSubject<number>(0);
  managerCount = new BehaviorSubject<number>(0);

  constructor(private httpService: HttpClient) { }

  // function to getEmployeeCount
  getEmployeeCount(): void{
    this.getEmployees().subscribe(res => {
      this.employeeCount.next(res.length);
    })
  }

  // function to getManagerCount
  getManagerCount(resData): void{
    this.managerCount.next(resData.length);
  }

  // use of session storage to store userId and user
  loginData(res): void{
    sessionStorage.setItem('id', window.btoa(res['id']));
    sessionStorage.setItem('user', window.btoa(res));
  }

  // logout function to clear sessionStorage
  logOut(){
    sessionStorage.clear();
  }


  // api's
  getEmployees = () => {return this.httpService.get<Employee[]>(`${environment.baseUrl}employee`)}
  getManagers = () => {return this.httpService.get<Manager[]>(`${environment.baseUrl}manager`)}
  getEmployeesById = (id) => {return this.httpService.get<Employee>(`${environment.baseUrl}employee/${id}`)}
  addEmployee = (data) => {return this.httpService.post<Employee>(`${environment.baseUrl}employee`, data)}
  addManager = (data) => {return this.httpService.post<Manager>(`${environment.baseUrl}manager`, data)}
  updateEmployee = (id, data) => {return this.httpService.put<Employee>(`${environment.baseUrl}employee/${id}`, data)}
  deleteEmployee = (id) => { return this.httpService.delete(`${environment.baseUrl}employee/${id}`)}
}
