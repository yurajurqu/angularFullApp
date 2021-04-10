import { getIsLoading, State } from './../../app.reducer';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  isLoading$: Observable<boolean>;;
  loadingSubs :  Subscription;

  constructor(private AuthService: AuthService, private store: Store<State>) { }
  
  
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.AuthService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
