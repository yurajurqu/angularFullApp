import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [SignupComponent,    LoginComponent],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule
    ],
    exports: []
})
export class AuthModule {
    
}