import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService, Manager } from "../service/api-service.service";

@Injectable({
  providedIn: 'root'
})

export class ManagerResolver implements Resolve<Manager[]>{
  constructor(private apiService: ApiService){}

  // resolver to get manager data
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Manager[]> | Promise<Manager[]> | Manager[]{
    return this.apiService.getManagers();
  }
}
