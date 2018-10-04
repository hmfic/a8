import { Component, OnInit, ViewChild } from '@angular/core';
 import { Sankey1Component } from '../sankey1/sankey1.component';

@Component({
  selector: 'app-graphcentral',
  templateUrl: './graphcentral.component.html',
  styleUrls: ['./graphcentral.component.scss']
})
export class GraphcentralComponent implements OnInit {

	parentData:any;
	data:any;
 
	public hoverEvent: Event;

	childEventHover(event: Event) {
	  	// console.log("in graphcentral event=",event);
	    this.parentData = event;
	  }

	@ViewChild(Sankey1Component) child;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.parentData = event;
    this.data = this.child.data;
  }

}

//export class Parent {
//    parentData:any;
//}


/*
export class ParentComponent implements AfterViewInit {

  @ViewChild(ChildComponent) child;

  constructor() { }

  message:string;

  ngAfterViewInit() {
    this.message = this.child.message
  }
}
*/