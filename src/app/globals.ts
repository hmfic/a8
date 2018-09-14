import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  theme: string = 'default-theme';
  title: string = 'Unknown';
  name: string = 'Not set yet';
  users:any;
  comments:any;
  myinfo:any;
  gender:any;
}