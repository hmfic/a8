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
import { MatButtonModule, MatCardModule, MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatListModule, MatMenuModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule} from '@angular/cdk/overlay';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    DetailsComponent,
    JmodalComponent,
    PostsComponent,
    SidebarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
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
    OverlayModule
  ],
  providers: [
    Globals],
  bootstrap: [AppComponent],
  entryComponents: [ JmodalComponent ]
})
export class AppModule { }
