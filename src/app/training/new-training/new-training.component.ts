import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  selected: null;
  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  availableExercises: Observable<any>;

  ngOnInit(): void {
    this.availableExercises = this.db.collection('availableExercises').valueChanges();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
