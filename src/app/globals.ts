import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  theme: string = 'default-theme';
  title: string = 'Unknown';
  name: string = 'Not set yet';
  region: string = 'Not set yet';
  email: string = 'Not set yet';
  users:any;
  comments:any;
  myinfo:any;
  weatherhash:any;
  genderhash:any;
  todos:any;
}