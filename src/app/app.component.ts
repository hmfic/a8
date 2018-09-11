import { Component, HostBinding, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { Globals } from './globals';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { Routes, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

 export class AppComponent implements DoCheck{
// export class AppComponent{
  constructor(
    private cookieService: CookieService,
    public overlayContainer: OverlayContainer,
    private differs: KeyValueDiffers,
    private globals: Globals,
    private data: DataService,
    public router: Router)
      { }
    
  @HostBinding('class') componentCssClass;
  cookieValue:string = 'UNKNOWN';
  oldTheme:string = "UNDEFINED";
  oldName:string;

  

  ngOnInit(): void {
    // look for theme cookie
    console.log("in app component nginit");
    const cookieExists: boolean = this.cookieService.check('theme');
    var currTheme="dark-theme";
    if (cookieExists) {
      currTheme=this.cookieService.get('theme');
    } 
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    //console.log("first time classes=",overlayContainerClasses);
    overlayContainerClasses.remove("dark-theme");
    overlayContainerClasses.remove("light-theme");
    overlayContainerClasses.remove("default-theme");
    this.overlayContainer.getContainerElement().classList.add(currTheme);
    overlayContainerClasses.add(currTheme);
    this.componentCssClass = currTheme;
    this.globals.theme=currTheme;
    this.globals.title="Application8";
    this.globals.name="Unknown";
    this.globals.users=[];
    this.globals.comments=[];
    this.oldTheme = this.globals.theme;
// check for name in cookies
    const cookieExists2: boolean = this.cookieService.check('name');
    if (cookieExists2) {
      this.globals.name=this.cookieService.get('name');
    } 
    this.oldName = this.globals.name;
    // load up users into global array
    this.data.getUsers().subscribe(data => {this.globals.users = data},error => {console.log("getusers error");});
    this.data.getComments().subscribe(data => {this.globals.comments = data},error => {console.log("getcomments error");});
    // console.log("loaded global users;=",this.globals.users);

    // get all the routes
    //for (var i = 0; i < this.router.config.length; i++) {
    //    var routePath:string = this.router.config[i].path;
    //    console.log(routePath);
    //}
    
  }

   ngDoCheck() {
    /*  if (typeof this.globals.users[0] === "undefined") {
       console.log("global.user undefined; len=",this.globals.users.length);
       console.log("global users undefined");
     } else {
       console.log("global users defined; globals.users lat=",this.globals.users[0]);
       console.log("global.user defined; len=",this.globals.users.length);
     } */
     if (this.oldTheme != this.globals.theme) {
        console.log("in ngdocheck; global new theme=",this.globals.theme);
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (this.globals.theme ==  themeClassesToRemove[0]) {
          //console.log("no change!");
        } else {
          //console.log("to remove=",themeClassesToRemove);
          for (var i=0; i<themeClassesToRemove.length; i++) {
            //console.log("looping; themeClassesToRemove[i]=",themeClassesToRemove[i]);
             overlayContainerClasses.remove(themeClassesToRemove[i]);
          }
          //console.log("after removal=", Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'))) ;
        }
        // adding classes back now
        overlayContainerClasses.add(this.globals.theme);
        this.componentCssClass = this.globals.theme;
        // update theme cookie if needed
        if (this.cookieService.get('theme') != this.globals.theme) 
          this.cookieService.set( 'theme', this.globals.theme );
     }

     // check for name change
    if (this.globals.name != this.oldName) {
      console.log("in ngdocheck; name changed' old:new=",this.oldName,":",this.globals.name);
      this.oldName = this.globals.name;
      // set the cookie for the name
      const cookieExists: boolean = this.cookieService.check('name');
      if (!cookieExists) {
          console.log("name cookie doesnt exist... setting to undefined");
          this.cookieService.set( 'name', "Undefined" );
        } 
      if (this.cookieService.get('name') != this.globals.name) {
          console.log("name cookie doesnt match... setting cookie to name");
          this.cookieService.set( 'name', this.globals.name );
        }
      }

  }   // end ngdocheck
}  // end appcomponent