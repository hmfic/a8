import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Globals } from '../globals';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  users:Object;
  distances:Object;
  weatherlat:any;
  weatherlon:any;

  constructor(
  	private data: DataService,
  	private globals: Globals,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
    this.matIconRegistry.addSvgIcon(
        'female',
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/female.svg")
    );
    this.matIconRegistry.addSvgIcon(
        'male',
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/male.svg")
    );
  }


  ngOnInit() {
  	//this.data.getUsers().subscribe(data => this.users = data);
  	//this.data.getUsers().subscribe(data => this.globals.users = data);
  	//this.globals.users=data;
  }

  findGender(name) {
    name=name.split(" ")[0];
    return this.globals.genderhash[name];
  }

  findWeather(lon,lat) {
   //console.log("in findWeather in users; lat:lon=",lat,":",lon);
   lon=parseFloat(lon).toFixed(2);
   lat=parseFloat(lat).toFixed(2);
   for (var i=0;i<this.globals.weatherhash.length;i++) {
      this.weatherlon=parseFloat(this.globals.weatherhash[i].coord.lon).toFixed(2);
      this.weatherlat=parseFloat(this.globals.weatherhash[i].coord.lat).toFixed(2);
      //console.log("testing weatherlat=",i,":",this.weatherlat,"=",lat);
      //console.log("testing weatherlon=",i,":",this.weatherlon,"=",lon);
     if (this.weatherlat == lat &&  this.weatherlon == lon) {
       return {"temp":parseFloat(this.globals.weatherhash[i].main.temp).toFixed(0),"skys":this.globals.weatherhash[i].weather[0].description,"icon":this.globals.weatherhash[i].weather[0].icon}
     }
   }  // end for loop
   //.toFixed(2)
   return {"temp":"na","skys":"na","icon":"na"};
  }
  

}
