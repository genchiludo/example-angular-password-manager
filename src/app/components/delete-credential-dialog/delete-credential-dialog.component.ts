import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-credential-dialog',
  templateUrl: 'delete-credential-dialog.component.html',
})

export class DeleteCredentialDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteCredentialDialogComponent>,
  ) {}

  public onConfirmDelete() {
    this.dialogRef.close(true);
  }
}
