import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { DetailsComponent } from './details/details.component';
import { JmodalComponent } from './jmodal/jmodal.component';
import { PostsComponent } from './posts/posts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';

// new stuff
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatGridListModule, MatCheckboxModule, 
         MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, 
         MatSelectModule, MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule} from '@angular/cdk/overlay';
import { Globals } from './globals';
import { CookieService } from 'ngx-cookie-service';
import { TodosComponent } from './todos/todos.component';
import { SidebarService } from './sidebar/sidebar.service';
import { AgmCoreModule } from '@agm/core';
import { ForceComponent } from './force/force.component';

import { select, selectAll } from "d3-selection";
import { HelpmodalComponent } from './helpmodal/helpmodal.component';

import { MatIconModule } from "@angular/material/icon";
import { Sankey1Component } from './sankey1/sankey1.component';
import { GraphcentralComponent } from './graphcentral/graphcentral.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    DetailsComponent,
    JmodalComponent,
    PostsComponent,
    SidebarComponent,
    UsersComponent,
    TodosComponent,
    ForceComponent,
    HelpmodalComponent,
    Sankey1Component,
    GraphcentralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    OverlayModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmmelmeHOr3KQovKCisOQfstNRR-TuVEs'
    })
  ],
  providers: [
    Globals, 
    CookieService,
    SidebarService
    ],
  bootstrap: [AppComponent],
  entryComponents: [ JmodalComponent, HelpmodalComponent ]
})
export class AppModule { }
