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

  ngOnInit() {
  	this.data.getTodos(this.user).subscribe(data => this.todos = data);
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
