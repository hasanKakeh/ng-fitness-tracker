import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<fromRoot.State> ) {}
  isLoading: boolean = false;
  isLoading$: Observable<boolean>;
  loadingSubscription: Subscription;
  ngOnInit(): void {
    this.isLoading$=this.store.select(fromRoot.getIsLoading)
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (loadingState) => {
    //     this.isLoading = loadingState;
    //   }
    // );
  }
  login(loginForm: NgForm) {
    this.authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });
  }
 
}
