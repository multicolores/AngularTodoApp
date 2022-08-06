import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-newtask',
  templateUrl: './dialog-newtask.component.html',
  styleUrls: ['./dialog-newtask.component.scss']
})
export class DialogNewtaskComponent implements OnInit {

  form!: FormGroup;
  name:string | undefined;
  description:string | undefined;
  importance:string | undefined;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogNewtaskComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.name, []],
      description: [this.description, []],
      importance: [this.importance, []],
      finished: false,
    });
  }

  save() {
    if(this.form)
      this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
