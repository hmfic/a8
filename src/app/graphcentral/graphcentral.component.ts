import { Component, OnInit } from '@angular/core';
// import { Event } from './classes/event';

@Component({
  selector: 'app-graphcentral',
  templateUrl: './graphcentral.component.html',
  styleUrls: ['./graphcentral.component.scss']
})
export class GraphcentralComponent implements OnInit {

	public clickedEvent: Event;

	  childEventHover(event: Event) {
	  	console.log("in graphcentral event=",event);
	    // this.hoverEvent = event;
	  }

  constructor() { }

  ngOnInit() {
  }

}
