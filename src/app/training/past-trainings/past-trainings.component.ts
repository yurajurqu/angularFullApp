import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {

  constructor(private ts: TrainingService) { }
  displayedColumns = ["date","name","calories","duration","state"];
  dataSource = new MatTableDataSource<Exercise>();

  ngOnInit(): void {
    this.dataSource.data = this.ts.getPastExercises();
  }

}
