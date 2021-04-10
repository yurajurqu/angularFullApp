import { getFinishedExercises } from './../training.reducer';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ["date", "name", "calories", "duration", "state"];
  dataSource = new MatTableDataSource<Exercise>();


  constructor(private ts: TrainingService, private store: Store<State>) { }


  ngAfterViewInit(): void {
    console.log(this.sort);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  

  ngOnInit(): void {
    this.store.select(getFinishedExercises).subscribe(finishedExercises => {
        this.dataSource.data = finishedExercises;
    });
    this.ts.fetchCompletedOrCancelledExercises();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
