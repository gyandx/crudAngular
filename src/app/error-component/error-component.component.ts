import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.scss']
})
export class ErrorComponent implements OnInit {

  errorText: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // getting the error message from interceptors according to status code.
    this.activatedRoute.queryParams.subscribe(res => {
      if (res[`errorMsg`] !== undefined) {
        this.errorText = res[`errorMsg`];
      }
    });
  }

  changeRoute(): void {
    if (sessionStorage.getItem('id')) {
      this.router.navigate(['/employee']);
    } else {
      this.router.navigate(['/manager']);
    }
  }

}
