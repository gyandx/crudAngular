import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  // use of input decorators for parent child communication to get messages & alert color
  @Input('msg') message: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
