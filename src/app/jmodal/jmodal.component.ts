import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogContent, MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatInputModule, MatSelectModule} from "@angular/material";
import { MenubarComponent} from "../menubar/menubar.component";
import { FormBuilder, Validators, FormGroup, FormsModule, } from "@angular/forms";
import { Inject } from '@angular/core';

@Component({
  selector: 'app-mysettingsmodal',
  templateUrl: './jmodal.component.html',
  styleUrls: ['./jmodal.component.scss']
})  // end component

export class JmodalComponent  {

    form: FormGroup;
    name: string;
    modalTitle: string;

    constructor(
    	private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<JmodalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        	this.modalTitle = data.title;
    		} 

    close() {
      this.dialogRef.close();
    	}

    ngOnInit() {
      this.form = this.formBuilder.group( {
        name: '',email: '', region: ''
      })
    }
    submit(form) {
      console.log("submit!=",form.value.name,":",form.value.email);
      this.name=form.value.name;
      this.dialogRef.close(`${form.value.name})`);
      
    }
}
