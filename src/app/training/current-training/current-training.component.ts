import { getActiveTraining } from './../training.reducer';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../training.reducer';
import { Exercise } from '../exercise.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer = null;

  constructor(private dialog: MatDialog, private trainigService : TrainingService, private store: Store<State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  startOrResumeTimer() {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(
      (exercise: Exercise) => {
        const step = exercise.duration / 100 *1000;
        this.timer= setInterval(() => {
          this.progress += 5;
          if (this.progress >= 100) {
            this.trainigService.completeExercise();
            clearInterval(this.timer)
          }
        }, step);    
      }
    );
  }

  stop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainigService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }

    });
  }

}
