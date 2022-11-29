import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  pageTitle = 'Error404';
  isNotHome = true;

  constructor() { }

  ngOnInit() {
  }

}
