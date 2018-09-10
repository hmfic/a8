import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Globals } from '../globals'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  users:Object;
 

  constructor(
  	private data: DataService,
  	private globals: Globals) { }


  ngOnInit() {
  	this.data.getUsers().subscribe(data => this.users = data);
  	this.data.getUsers().subscribe(data => this.globals.users = data);
  	//this.globals.users=data;
  }

}
