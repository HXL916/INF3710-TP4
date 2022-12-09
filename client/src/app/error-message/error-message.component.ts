import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:string, private matDialogRefAjouter: MatDialogRef<ErrorMessageComponent>,) { }

  ngOnInit(): void {
  }
  public closeModale() {
    this.matDialogRefAjouter.close();
  }
}
