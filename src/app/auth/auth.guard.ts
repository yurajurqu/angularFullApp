import { getIsAuth } from './../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { State } from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService,private router: Router, private store: Store<State>) {
        
    }
    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {

        return this.store.select(getIsAuth).pipe(take(1));
     
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(getIsAuth).pipe(take(1));
      
    }
    
}