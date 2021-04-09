import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule
    ],
    exports: []
})
export class AuthModule {
    
}