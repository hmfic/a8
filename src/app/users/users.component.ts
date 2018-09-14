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
    for(var i=0;i<this.globals.gender.length;i++) {
      //console.log("in findgender;i=",i);
      if(this.globals.gender[i].name == name) {
        //console.log("found a name match; name=",this.globals.gender[i].name);
        return this.globals.gender[i].gender;
      }
    }
  }

  

}
