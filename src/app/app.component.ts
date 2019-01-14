import { Component, HostBinding, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { Globals } from './globals';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { Routes, Route, Router } from '@angular/router';
import { map, flatMap, switchMap, mergeMap, catchError } from 'rxjs/operators';

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
  oldRegion:string = "UNDEFINED";
  dirty:boolean=false;
  oldName:string;
  oldEmail:string;
  //gender:any;
  //lat$:number;
  result:any;
  expiredDate:Date;
  locali:number;
  
  ngOnInit(): void {
    // look for theme cookie
    this.expiredDate = new Date();
    this.expiredDate.setDate( this.expiredDate.getDate() + 7 );
    // console.log("in app component nginit");
    // handle region cookies
    const cookieExists4: boolean = this.cookieService.check('region');
    if (cookieExists4) {
      this.globals.region=this.cookieService.get('region');
      this.oldRegion=this.globals.region;
    }  else {
      this.cookieService.set( 'region', "Not set yet" ,this.expiredDate);
      this.oldRegion="Not set yet";
    }
    // handle theme cookies
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
    this.globals.title="APPLICATION8";
    this.globals.name="Unknown";
    this.globals.users=[];
    this.globals.genderhash=[];
    this.globals.weatherhash=[];
    this.globals.comments=[];
    //this.gender=[];
    this.oldTheme = this.globals.theme;

    const cookieExists5: boolean = this.cookieService.check('email');
    if (cookieExists5) {
      this.globals.email=this.cookieService.get('email');
    } 
    this.oldEmail = this.globals.email;
// check for name in cookies
    const cookieExists2: boolean = this.cookieService.check('name');
    if (cookieExists2) {
      this.globals.name=this.cookieService.get('name');
    } 
    this.oldName = this.globals.name;
   // look up current user geo coordinates

   const cookieExists3: boolean = this.cookieService.check('myinfo');
   if(cookieExists3) { 
     this.globals.myinfo = JSON.parse(this.cookieService.get('myinfo'));
   } else  {
      this.data.getLoc().subscribe (data => {
        //console.log("myinfo not set; data.lat=",data.lat);
        this.cookieService.set( 'myinfo', JSON.stringify(data),this.expiredDate);
        this.globals.myinfo=data;
      })
    };
  //};
     // load up users into global array
     this.data.getUsers().subscribe(data => {
      this.globals.users = data;
      for (var i =0;i< this.globals.users.length;i++) {
        this.globals.users[i].gender="";
        //console.log("in appcomponent.ts; before looking up distance for a user; user=",this.globals.users[i]);
        if(typeof this.globals.myinfo === "undefined") {
          //console.log("mylat is undefined");
          // should never get here
          this.globals.users[i].dist = -99;
        } else {
          // console.log("mylat is defined, setting dist in globals");
          this.result=this.data.getDistance(this.globals.users[i].address.geo.lat,this.globals.users[i].address.geo.lng,this.globals.myinfo.lat,this.globals.myinfo.lon,"K");
          this.globals.users[i].dist = this.result;
        }

        this.data.getGender(this.globals.users[i].name).subscribe (gdata => {
            this.globals.genderhash[gdata["name"]]= gdata["gender"];
          })

        } // end for loop
      },error => {console.log("getusers error");
    }); // end subscribe 

    this.data.getComments().subscribe(data => {this.globals.comments = data},error => {console.log("getcomments error");}
      );
    this.data.getTodos().subscribe(data => {
      //this.todos = data;
      this.globals.todos=data;
      });
  }

   ngDoCheck() {
      if (typeof this.globals.users != "undefined") {
       if (this.globals.users.length > 0) {
         // console.log("users defined;len=",this.globals.users.length);
         // console.log("this.globals.users[0].name=",this.globals.users[0].name);
         if (this.dirty == false) {
            this.dirty=true;
            for (var i=0;i<this.globals.users.length;i++) {
               // console.log("weatherhash 0;len=",this.globals.weatherhash.length);
               if(typeof this.globals.users[i].name != "undefined") {
                   // console.log("OK, the users array is more than 0, exists and the .name attribute is defined");
                   this.data.getWeather(this.globals.users[i]["address"]["geo"]["lng"],this.globals.users[i].address.geo.lat).subscribe (wdata => {
                      this.globals.weatherhash.push(wdata);
                      //console.log("weatherhash pushed",this.globals.weatherhash);
                    })
                // end if 
              }
           }
         }
       }
     }
     // console.log("in docheck; this.oldRegion:this.globals.region",this.oldRegion,":",this.globals.region)
     if (this.oldRegion != this.globals.region) {
       this.cookieService.set( 'region', this.globals.region ,this.expiredDate);
     }

     if (this.oldEmail != this.globals.email) {
       this.cookieService.set( 'email', this.globals.email ,this.expiredDate);
     }

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
          this.cookieService.set( 'theme', this.globals.theme, this.expiredDate );
     }

     // check for name change
    if (this.globals.name != this.oldName) {
      // console.log("in ngdocheck; name changed' old:new=",this.oldName,":",this.globals.name);
      this.oldName = this.globals.name;
      // set the cookie for the name
      const cookieExists: boolean = this.cookieService.check('name');
      if (!cookieExists) {
          console.log("name cookie doesnt exist... setting to undefined");
          this.cookieService.set( 'name', "Not set yet" ,this.expiredDate);
        } 
      if (this.cookieService.get('name') != this.globals.name) {
          console.log("name cookie doesnt match... setting cookie to name");
          this.cookieService.set( 'name', this.globals.name,this.expiredDate );
        }
      }

  }   // end ngdocheck
}  // end appcomponent