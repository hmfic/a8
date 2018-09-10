import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Globals } from "../globals";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(
  	private data: DataService,
  	private globals: Globals) { }

  todos:Object;
  user:Object;
  showCompleted:Boolean=true;
  persons:[];
  selectedID:number;

  ngOnInit() {
  	this.data.getTodos(this.user).subscribe(data => this.todos = data);
  	this.persons=[
  		{"name":"All","id":0},
  		{"name":"Leanne Graham","id":1},
  		{"name":"Ervin Howell","id":2},
  		{"name":"Clementine Bauch","id":3},
  		{"name":"Patricia Lebsack","id":4},
  		{"name":"Chelsey Dietrich","id":5},
  		{"name":"Mrs. Dennis Schulist","id":6},
  		{"name":"Kurtis Weissnat","id":7},
  		{"name":"Nicholas Runolfsdottir V","id":8},
  		{"name":"Glenna Reichert","id":9},
  		{"name":"Clementina DuBuque","id":10}
  		];
  	this.selectedID=0;
  }

  getUser(userID) {
  	//console.log("in getuser");
  	for (var i=0;i<this.globals.users.length;i++) {
  		if (this.globals.users[i].id == userID) {
  			//console.log("found match=", this.globals.users[i]);
  			return this.globals.users[i];
  		}
  	}
  	console.log("going to get user info in todos=",userID);
  	// return this.http.get('https://jsonplaceholder.typicode.com/users/' + userID)
  }


}
