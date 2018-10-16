import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { pluck, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Credential } from './models/credential.model';
import { User } from 'firebase/auth';

@Injectable()
export class AppService {
  public credentials: AngularFireList<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
  ) {
    this.credentials = this.af.list('/credentials');
  }

  public isLogged(): User {
    return this.afAuth.user;
  }

  public getUser(): User {
    return this.afAuth.user.pipe(
      pluck('displayName'),
    );
  }

  public doLogin(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public doLogout(): void {
    this.afAuth.auth.signOut();
  }

  public getCredentials$(): Observable<Credential[]> {
    return this.credentials.snapshotChanges().pipe(
      map(data => data.map(obj => ({
        key: obj.key,
        ...obj.payload.val(),
      }))),
    );
  }

  public createCredential$(credential: Credential): Observable<any> {
    return from(this.credentials.push(credential));
  }

  public deleteCredentials$(credential: Credential): Observable<any> {
    return from(this.credentials.remove(credential.key));
  }
}
