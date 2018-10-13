import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { pluck, map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class AppService {
  public credentials: AngularFireList<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
  ) {
    this.credentials = this.af.list('/credentials');
  }

  public isLogged() {
    return this.afAuth.user;
  }

  public getUser() {
    return this.afAuth.user.pipe(
      pluck('displayName'),
    );
  }

  public doLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public doLogout() {
    this.afAuth.auth.signOut();
  }

  public getCredentials$() {
    return this.credentials.snapshotChanges().pipe(
      map(data => data.map(obj => ({
        key: obj.key,
        ...obj.payload.val(),
      }))),
    );
  }

  public createCredential$(credential) {
    return from(this.credentials.push(credential));
  }

  public deleteCredentials$(credential) {
    return from(this.credentials.remove(credential.key));
  }
}
