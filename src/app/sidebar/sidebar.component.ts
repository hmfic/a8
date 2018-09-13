import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route, Routes, NavigationEnd } from '@angular/router';
import { SidebarService } from "../sidebar/sidebar.service";
import { MatSidenav } from '@angular/material';
import { Globals } from '../globals'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
	currentURL: string;
  @ViewChild('sidebar') public sidebar: MatSidenav;
  	constructor( 
      private sidebarService: SidebarService,
      private globals: Globals
      ) { 
  		// console.log("")
  		//router.events.subscribe((_ : NavigationEnd) => this.currentURL = _.url);
		}
  getBackground (theme){
    //console.log("in getbackground; theme=",theme);
    if (theme == "dark-theme") return "sidenav-links-light"
      else return "sidenav-links-dark"
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
