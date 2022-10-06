import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import { SetAuthenticated, SetUnAuthenticated } from './auth.actions';
@Injectable()
export class AuthService {
 
  

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>,
    private uiService: UIService
  ) {}

  initiAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new SetAuthenticated())
      //  this.isAuthenticated = true;
        this.router.navigate(['/training']);
       // this.authChange.next(true);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new SetUnAuthenticated())
        //  this.isAuthenticated = false;
      //  this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    //   this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        //  this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((err) => {
        //  this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(err.message, null, 3000);
        console.log(err);
      });
  }
  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((r) => {
        this.store.dispatch(new UI.StopLoading());
        console.log(r);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        //this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }
  logout() {
    this.afAuth.signOut();
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }
}
