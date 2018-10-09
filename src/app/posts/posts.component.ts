import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Globals } from "../globals";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts:Object;
  comments:Object;

  constructor(
  	private data: DataService,
  	private globals: Globals,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer

    ) { 
  this.matIconRegistry.addSvgIcon(
        'female',
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/female.svg")
    );
    this.matIconRegistry.addSvgIcon(
        'male',
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/male.svg")
    )}
  ngOnInit() {
  	this.data.getPosts().subscribe(data => this.posts = data);
  	this.data.getComments().subscribe(data => this.comments = data);
	}

  getUser(userID) {
  	//console.log("in getuser");
  	for (var i=0;i<this.globals.users.length;i++) {
  		if (this.globals.users[i].id == userID) {
  			//console.log("found match=", this.globals.users[i]);
  			return this.globals.users[i];
  		}
  	}
    console.log("Error; did not find a name; userID=",userID);
  }

  findGender(name) {
    name=name.split(" ")[0];
    //console.log("in post findgender; returning name=",name);
    //console.log("in post findgender; returning hash=",this.globals.genderhash[name])
    return this.globals.genderhash[name];
  }

}