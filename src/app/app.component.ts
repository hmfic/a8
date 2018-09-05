import { Component, HostBinding, Input, KeyValueDiffers, DoCheck } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { Globals } from './globals'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

 export class AppComponent implements DoCheck{
// export class AppComponent{
  constructor(
    public overlayContainer: OverlayContainer,
    private differs: KeyValueDiffers,
    private globals: Globals){ }
  title = 'a8';
  isOpen=true;
  @HostBinding('class') componentCssClass;
  

  ngOnInit(): void {
    //console.log("adding theme for first time...",this.globals.theme);
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    //console.log("first time classes=",overlayContainerClasses);
    overlayContainerClasses.remove("dark-theme");
    overlayContainerClasses.remove("light-theme");
    overlayContainerClasses.remove("default-theme");
    this.overlayContainer.getContainerElement().classList.add("dark-theme");
    overlayContainerClasses.add("dark-theme");
    this.componentCssClass = this.globals.theme;
  }

   ngDoCheck() {
    //console.log("in docheck; global theme=",this.globals.theme);
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
    //console.log("after add=",this.overlayContainer.getContainerElement().classList);
    // overlayContainerClasses.add(newThemeClass);
  } 

}
