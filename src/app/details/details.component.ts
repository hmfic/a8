import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { Globals } from "../globals";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user$: object;
  loc$: object;
  newval:number;

  constructor( 
    private route: ActivatedRoute, 
    private data: DataService,
    private globals: Globals) { 
  	this.route.params.subscribe( params => this.user$ = params.id);
  	}

  ngOnInit() {
    // console.log("this.user$=",this.user$);
    //this.user$ = this.globals.users;
  	//this.data.getUser(this.user$).subscribe (data => this.user$ = data);
    //this.data.getLoc().subscribe (data => {this.loc$ = data});
  }

  onMouseOver(infoWindow, gm) {
        if (gm.lastOpen != null) {
            gm.lastOpen.close();
        }
        gm.lastOpen = infoWindow;
        infoWindow.open();
    }
// openDialog():void
  distance(lat1, lon1, lat2, lon2, unit) {
    // console.log("in distance");
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return Math.round(dist);
    }

}
