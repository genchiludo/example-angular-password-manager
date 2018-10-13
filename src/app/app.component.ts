import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material';
import { AddCredentialDialogComponent } from './components/add-credential-dialog/add-credential-dialog.component';
import { DeleteCredentialDialogComponent } from './components/delete-credential-dialog/delete-credential-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  public credentials$: Observable<any>;
  public user$;

  constructor(
    private service: AppService,
    private dialog: MatDialog
  ) {
    this.user$ = this.service.getUser();
    this.credentials$ = this.service.getCredentials$();
  }

  public openAddModal() {
    const modal$ = this.dialog.open(AddCredentialDialogComponent, {
      width: '600px',
    }).afterClosed();

    modal$.pipe(
      filter(res => res),
      map(fields => Object.assign({}, ...Object.keys(fields).map(key => ({[key]: fields[key].value })))),
      switchMap(credential => this.service.createCredential$(credential)),
    ).subscribe();
  }

  public onDeleteCredential(credential) {
    const modal$ = this.dialog.open(DeleteCredentialDialogComponent, {
      width: '300px',
    }).afterClosed();

    modal$.pipe(
      filter(res => res),
      switchMap(() => this.service.deleteCredentials$(credential)),
    ).subscribe();
  }

  public isLogged() {
    return this.service.isLogged();
  }

  public getUser() {
    return this.service.getUser();
  }

  public doLogin() {
    this.service.doLogin();
  }

  public doLogout() {
    this.service.doLogout();
  }
}
