import { AuthService } from 'src/app/auth/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  ngOnInit(): void {
    this.authService.initAuthListener();
  }
  title = 'mynewproject';

  constructor(private authService: AuthService) { }

  
}
