import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  isLoading = false;
  loadingSubs :  Subscription;

  constructor(private AuthService: AuthService, private uiService: UIService) { }
  
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);


    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    });
  }

  onSubmit(form: NgForm) {
    this.AuthService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
