import { Observable } from 'rxjs';
import { getIstraining, State } from './training.reducer';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$ : Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<State>) { }
  


  ngOnInit(): void {

    this.ongoingTraining$ = this.store.select(getIstraining);
    
  }

}
