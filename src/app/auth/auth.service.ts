import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        
    }
    
  
    registerUser(authData: AuthData) {
        this.afAuth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result);
            this.user = {
                userId: '11',
                email:'yurajurqu@gmail.com'
            };
            this.authSuccessfully();
        })
            .catch(error => {
                console.log(error);
            })
        ;
    }
    login(authData: AuthData) {

        this.afAuth.signInWithEmailAndPassword(authData.email,authData.password).then(result => {
            console.log(result);
            this.user = {
                userId: '11',
                email:'yurajurqu@gmail.com'
            };
            this.authSuccessfully();
        })  .catch(error => {
                console.log(error);
            })
        ;
     
        this.authSuccessfully();
    }
    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }
    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user != null;
    }
    authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}