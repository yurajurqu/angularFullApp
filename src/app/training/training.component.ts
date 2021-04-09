import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit , OnDestroy{
  ongoingTraining = false;
  trainingServiceExerciseSubject: Subscription;

  constructor(private trainingService: TrainingService) { }
  
  ngOnDestroy(): void {
    if (this.trainingServiceExerciseSubject) {
      this.trainingServiceExerciseSubject.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.trainingServiceExerciseSubject = this.trainingService.startExerciseSubject.subscribe(
      exercise => {
        if (exercise != null) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

}
