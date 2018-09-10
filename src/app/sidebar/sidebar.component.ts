import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from "../sidebar/sidebar.service";
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	currentURL: string;
  @ViewChild('sidebar') public sidebar: MatSidenav;
  	constructor( private router: Router,
      private sidebarService: SidebarService
      ) { 
  		// console.log("")
  		//router.events.subscribe((_ : NavigationEnd) => this.currentURL = _.url);
		}

  // toggleActive:boolean;

  //toggleSidebar() {
  //  this.toggleActive = !this.toggleActive;
  //  this.sidebar.toggle();

  ngOnInit() {
    this.sidebarService.setSidebar(this.sidebar);
  }

}
