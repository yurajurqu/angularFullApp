import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter<void>();
  constructor(private authService : AuthService) { }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  isAuth = false;
  authSubscription : Subscription;

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  

  onCloseSidenav() {
    this.sidenavClose.emit();
  }
  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
