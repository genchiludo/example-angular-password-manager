import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credentials-table',
  templateUrl: 'credentials-table.component.html',
})

export class CredentialsTableComponent {
  @Input() credentials;
  @Output() deleteRow: EventEmitter<any> = new EventEmitter();
  public displayedColumns: string[] = ['username', 'password', 'url', 'type', 'action'];

  public onDelete(credential) {
    this.deleteRow.emit(credential);
  }
}
