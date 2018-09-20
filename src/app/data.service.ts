import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    //console.log("in getusers");
  	return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getPosts() {
  	return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getUser(userID) {
  	return this.http.get('https://jsonplaceholder.typicode.com/users/' + userID)
  }

  getTodos() {
    //console.log("in gettodos");
  	return this.http.get('https://jsonplaceholder.typicode.com/todos')
  }

  getComments() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
  }

  getLoc() {
    return this.http.get('http://ip-api.com/json')
  }

  getGender(name) {
    name=name.split(" ")[0];
    //console.log("about to call gendererizer; name=",name);
    return this.http.get('https://api.genderize.io/?name=' + name)
  }

  getWeather(lon,lat) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=744c3d107bbf3d1d7046c14dc5e8567d')
  }

  getDistance(lat1, lon1, lat2, lon2, unit) {
      // console.log("in data service getDistance; parms=",lat1,":", lon1, ":",lat2, ":",lon2, ":",unit);
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
