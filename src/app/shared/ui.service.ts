import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class UIService {
    constructor(private snackbar: MatSnackBar) {
    }
    

    showSnackbar(message, action, duration) {
        this.snackbar.open(message,action,{duration: duration})
    }
 }