import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogContent, MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatInputModule, MatSelectModule} from "@angular/material";
import { MenubarComponent} from "../menubar/menubar.component";
import { FormBuilder, Validators, FormGroup, FormsModule, } from "@angular/forms";
import { Inject } from '@angular/core';
import { Globals } from '../globals'

@Component({
  selector: 'app-mysettingsmodal',
  templateUrl: './jmodal.component.html',
  styleUrls: ['./jmodal.component.scss']
})  // end component

export class JmodalComponent  {

    form: FormGroup;
    name: string;
    modalTitle: string;
    theme: string;
    region: string;

    constructor(
    	private formBuilder: FormBuilder,
      private globals: Globals,
      private dialogRef: MatDialogRef<JmodalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        	this.modalTitle = data.title;
    		} 
    

    close() {
      this.dialogRef.close();
    	}

    ngOnInit() {
      //console.log("global theme=",this.globals);
      this.form = this.formBuilder.group( {
        name: '',email: '', region: ''
      });
      
    }

    onSetTheme(theme) {
      this.globals.theme=theme;
    }

    onSetRegion(region) {
      this.globals.region=region;
    }
}
