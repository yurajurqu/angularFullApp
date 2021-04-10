import { getIsAuth } from './../../app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter<void>();
  constructor(private authService : AuthService, private store : Store<State>) { }
  
  isAuth$: Observable<boolean>;

  ngOnInit(): void {
    this.isAuth$ = this.store.select(getIsAuth);
  }
  

  onCloseSidenav() {
    this.sidenavClose.emit();
  }
  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
