import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
  	return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getPosts() {
  	return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getUser(userID) {
  	return this.http.get('https://jsonplaceholder.typicode.com/users/' + userID)
  }

  getTodos(userID) {
  	return this.http.get('https://jsonplaceholder.typicode.com/todos')
  }

  getComments() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
  }

  getLoc() {
    return this.http.get('http://ip-api.com/json')
  }
  
}
