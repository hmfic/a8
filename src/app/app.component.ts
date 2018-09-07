import { Component, HostBinding, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { Globals } from './globals';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';

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
    private data: DataService)
      { }
    
  @HostBinding('class') componentCssClass;
  cookieValue:string = 'UNKNOWN';
  oldTheme:string = "UNDEFINED";
  oldName:string;


  ngOnInit(): void {
    // look for theme cookie
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
    //console.log("nginit; theme set to ",currTheme);
    // set globals
    this.globals.title="a8";
    this.globals.name="Unknown";
    this.oldTheme = this.globals.theme;
// check for name in cookies
    const cookieExists2: boolean = this.cookieService.check('name');
    if (cookieExists2) {
      this.globals.name=this.cookieService.get('name');
    } 
    this.oldName = this.globals.name;
    // load up users into global array
    this.data.getUsers().subscribe(data => this.globals.users = data);
  }

   ngDoCheck() {
       //console.log("this.oldTheme=",this.oldTheme);
       //console.log("this.globals.theme=",this.globals.theme);
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
        // adding back now
        //console.log("adding back now")
        overlayContainerClasses.add(this.globals.theme);
        this.componentCssClass = this.globals.theme;
        // update theme cookie if needed
        if (this.cookieService.get('theme') != this.globals.theme) 
          this.cookieService.set( 'theme', this.globals.theme );
     }
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

  } 
}  // end appcomponent