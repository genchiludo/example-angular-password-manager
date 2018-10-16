import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material';
import { User } from 'firebase/auth';
import { AddCredentialDialogComponent } from './components/add-credential-dialog/add-credential-dialog.component';
import { DeleteCredentialDialogComponent } from './components/delete-credential-dialog/delete-credential-dialog.component';
import { Credential } from './models/credential.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  public credentials$: Observable<Credential[]>;
  public user$;

  constructor(
    private service: AppService,
    private dialog: MatDialog
  ) {
    this.user$ = this.service.getUser();
    this.credentials$ = this.service.getCredentials$();
  }

  public openAddModal(): void {
    const modal$ = this.dialog.open(AddCredentialDialogComponent, {
      width: '600px',
    }).afterClosed();

    modal$.pipe(
      filter(res => res),
      map((fields: Credential) => Object.assign({}, ...Object.keys(fields).map(key => ({[key]: fields[key].value })))),
      switchMap((credential: Credential) => this.service.createCredential$(credential)),
    ).subscribe();
  }

  public onDeleteCredential(credential: Credential): void {
    const modal$ = this.dialog.open(DeleteCredentialDialogComponent, {
      width: '300px',
    }).afterClosed();

    modal$.pipe(
      filter(res => res),
      switchMap(() => this.service.deleteCredentials$(credential)),
    ).subscribe();
  }

  public isLogged(): User {
    return this.service.isLogged();
  }

  public getUser(): User {
    return this.service.getUser();
  }

  public doLogin(): void {
    this.service.doLogin();
  }

  public doLogout(): void {
    this.service.doLogout();
  }
}
