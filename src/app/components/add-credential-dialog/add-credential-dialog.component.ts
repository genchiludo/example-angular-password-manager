import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-credential-dialog',
  templateUrl: 'add-credential-dialog.component.html',
})

export class AddCredentialDialogComponent {
  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    url: new FormControl(null, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    type: new FormControl(null, [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddCredentialDialogComponent>,
    private snackBar: MatSnackBar,
  ) {}

  public onSubmit() {
    if (this.form.valid) {
      return this.dialogRef.close(this.form.controls);
    }
    this.snackBar.open('Please, complete all fields', 'Ok', {
      duration: 3000
    });
    return false;
  }
}
