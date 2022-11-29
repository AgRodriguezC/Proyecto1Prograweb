import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {
  pageTitle = 'Viajar';
  isNotHome = true;

  constructor() { }

  ngOnInit() {
  }

}
