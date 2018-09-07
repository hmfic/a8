import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	currentURL: string;

  	constructor( private router: Router) { 
  		// console.log("")
  		//router.events.subscribe((_ : NavigationEnd) => this.currentURL = _.url);
		}


  ngOnInit() {

  }

}
