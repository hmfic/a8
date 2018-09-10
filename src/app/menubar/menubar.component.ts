import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { JmodalComponent } from "../jmodal/jmodal.component";
import { SidebarComponent} from "../sidebar/sidebar.component";
import { Globals } from '../globals';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  modalTitle:string;

  constructor(
        private dialog: MatDialog,
        private globals: Globals,
        private sidebar: SidebarService) { };

  toggleActive:boolean = false;

  public toggleSidebar() {
    this.toggleActive = !this.toggleActive;
    this.sidebar.toggle();

    // console.log('Clicked');
  }

  openDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'My settings'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(JmodalComponent, dialogConfig);
    } 

  openSysDialog():void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'System settings'
          };
        // dialogConfig.direction = "rtl";
        this.dialog.open(JmodalComponent, dialogConfig);
    }


  ngOnInit() { }
 }