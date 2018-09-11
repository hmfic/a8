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
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule} from '@angular/cdk/overlay';
import { Globals } from './globals';
import { CookieService } from 'ngx-cookie-service';
import { TodosComponent } from './todos/todos.component';
import { SidebarService } from './sidebar/sidebar.service';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    DetailsComponent,
    JmodalComponent,
    PostsComponent,
    SidebarComponent,
    UsersComponent,
    TodosComponent
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
    MatSidenavModule,
    MatToolbarModule,
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
  entryComponents: [ JmodalComponent ]
})
export class AppModule { }
