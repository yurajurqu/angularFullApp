import { State } from './../app.reducer';
import { TrainingService } from './../training/training.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
    
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
        private uiService: UIService, private store: Store<{ui: fromApp.State}>) {
    }
    
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }
  
    registerUser(authData: AuthData) {

        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.store.dispatch({type: 'STOP_LOADING'});
        })
        .catch(error => {
            this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackbar(error.message, null,  3000 );
            })
        ;
    }
    login(authData: AuthData) {
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.signInWithEmailAndPassword(authData.email,authData.password).then(result => {
            console.log(result);
            this.store.dispatch({type: 'STOP_LOADING'});
        })  .catch(error => {
            console.log(error);
            this.store.dispatch({type: 'STOP_LOADING'});
            this.uiService.showSnackbar(error.message, null, 3000 );
        })
        ;
    }
    logout() {
        this.afAuth.signOut();
        
    }
   
    isAuth() {
        return this.isAuthenticated;
    }

}