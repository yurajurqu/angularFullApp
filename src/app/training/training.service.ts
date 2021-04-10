import { getActiveTraining } from './training.reducer';
import { SetAvailableTrainings, SetFinishedTrainings, StartTraining, StopTraining } from './training.actions';
import { UIService } from './../shared/ui.service';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import  'rxjs/add/operator/map';
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';
import * as fromTraining from '../training/training.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import { take } from 'rxjs/operators';

@Injectable()
export class TrainingService {

    constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State> ) {
    }



    private fbSubs: Subscription[] = [];

    finishedExercisesChanged  = new Subject<Exercise[]>();
 

    private runningExercise: Exercise;

    fetchAvailableExercises() {

        this.store.dispatch(new StartLoading());
       
        this.fbSubs.push( this.db.collection('availableExercises')
        .snapshotChanges()
            .map(docArray => {
                // throw new Error();
            return docArray.map(doc => {
                return {
                    id: doc.payload.doc['id'],
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories']
                }
            });
        })
        .subscribe((exercises:Exercise[]) => {
            this.store.dispatch(new StopLoading());
            this.store.dispatch(new SetAvailableTrainings(exercises));
        }, error => {
            this.uiService.showSnackbar('Fetching exercises failed, please try again later',null, 3000);
            this.store.dispatch(new SetAvailableTrainings([]));
            this.store.dispatch(new StopLoading());
        }));
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({... ex, date: new Date(), state: 'completed'});
            this.store.dispatch(new StopTraining());
        });
        
    }
    cancelExercise(progress: number) {

        this.store.select(getActiveTraining).pipe(take(1)).subscribe(ex => {
            
            this.addDataToDatabase({...ex, date: new Date(), state: 'cancelled', duration: ex.duration*(progress/100), calories:ex.calories*(progress/100) });
            this.store.dispatch(new StopTraining());
        });
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe()
            }
        });
    }

    fetchCompletedOrCancelledExercises() {
        this.store.dispatch(new StartLoading());
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new StopLoading());
            this.store.dispatch(new SetFinishedTrainings(exercises));
        }));
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}