import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Globals } from "../globals";

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
  	private globals: Globals) { }
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

  /* getComments(postId) {
  	console.log("in getcomments; postID=",[postId]);
  	for (var i=0;i<this.globals.comments.length;i++) {
  		if (this.globals.comments[i].postId == postId) {
  			console.log("found getcomments match=", this.globals.users[i]);
  			return this.globals.comments[i];
  		}
  	}
  } */

}