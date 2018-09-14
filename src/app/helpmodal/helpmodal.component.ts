import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-helpmodal',
  templateUrl: './helpmodal.component.html',
  styleUrls: ['./helpmodal.component.scss'],

// we need this animation since ngIf can't do animations
  animations: [
    trigger('animationOption', [      
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ Opacity: 0 }))
      ]),
      state('*', style({ Opacity: 1 })),
    ])
  ]


})
export class HelpmodalComponent implements OnInit {
	showIpad: boolean;
	constructor() { 
	this.showIpad = false;}


  ngOnInit() {
  }

}
