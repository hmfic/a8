import { Component, HostBinding } from '@angular/core';

import { OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public overlayContainer: OverlayContainer){}
  title = 'a8';
  isOpen=true;
  @HostBinding('class') componentCssClass;

  theme: string = 'dark-theme';

  onSetTheme(theme) {
	console.log("in set theme=",theme);
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  	}

  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

}