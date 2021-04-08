import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ts: TrainingService) { }
  ngAfterViewInit(): void {
    console.log(this.sort);
    this.dataSource.sort = this.sort;
  }
  displayedColumns = ["date","name","calories","duration","state"];
  dataSource = new MatTableDataSource<Exercise>();

  ngOnInit(): void {
    this.dataSource.data = this.ts.getPastExercises();
  }


}
