import {
  Component,
  EventEmitter,
  
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: Observable<boolean>;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth = this.store.select(fromRoot.getIsAuthenticated);
    // this.authService.authChange.subscribe((authState) => {
    //   this.isAuth = authState;
    // });
  }
  onCloseSidenav() {
    this.sidenavClose.emit();
  }
  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }

}
