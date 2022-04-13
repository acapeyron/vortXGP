import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../service/navigation/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  // is router in public good in terms of security ?
  // use of Router and NvigationService to be able to switch between pages
  constructor(public navigation: NavigationService, public router: Router) { }

  ngOnInit(): void {
  }

}
