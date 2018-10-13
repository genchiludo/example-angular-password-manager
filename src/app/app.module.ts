import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { AddCredentialDialogComponent } from './components/add-credential-dialog/add-credential-dialog.component';
import { CredentialsTableComponent } from './components/credentials-table/credentials-table.component';
import { DeleteCredentialDialogComponent } from './components/delete-credential-dialog/delete-credential-dialog.component';

import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddCredentialDialogComponent,
    CredentialsTableComponent,
    DeleteCredentialDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDividerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AppService,
  ],
  entryComponents: [
    AddCredentialDialogComponent,
    DeleteCredentialDialogComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
