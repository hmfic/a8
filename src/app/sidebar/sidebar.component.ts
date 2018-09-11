import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, Routes, NavigationEnd } from '@angular/router';
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
  	constructor( 
      private sidebarService: SidebarService
      ) { 
  		// console.log("")
  		//router.events.subscribe((_ : NavigationEnd) => this.currentURL = _.url);
		}


  ngOnInit() {
    this.sidebarService.setSidebar(this.sidebar);

    /* for (var i = 0; i < this.router.config.length; i++) {
        var routePath:string = this.router.config[i].path;
        //console.log(routePath);
        console.log("whole route config object=",this.router.config[i]);
        console.log("whole route object=",this.router);
    } */
  }

}
