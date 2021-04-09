import { UIService } from './../shared/ui.service';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import  'rxjs/add/operator/map';
import { Subscription } from "rxjs";

@Injectable()
export class TrainingService {

    constructor(private db: AngularFirestore, private uiService: UIService) {
    }

    startExerciseSubject = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();


    private fbSubs: Subscription[] = [];

    finishedExercisesChanged  = new Subject<Exercise[]>();
 
    availableExercises =[];

    private runningExercise: Exercise;

    fetchAvailableExercises() {

        this.uiService.loadingStateChanged.next(true);
       
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
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
        }, error => {
            this.uiService.showSnackbar('Fetching exercises failed, please try again later',null, 3000);
            this.exercisesChanged.next(null);
            this.uiService.loadingStateChanged.next(false);
        }));
    }

    startExercise(selectedId: string) {
        this.db.doc('availableExercises/' + selectedId).update({
            lastSelected: new Date()
        });
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.startExerciseSubject.next({...this.runningExercise});
    }

    completeExercise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.startExerciseSubject.next(null);
    }
    cancelExercise(progress: number) {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration*(progress/100), calories:this.runningExercise.calories*(progress/100) });
        this.runningExercise = null;
        this.startExerciseSubject.next(null);
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            if (sub) {
                sub.unsubscribe()
            }
        });
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }
    fetchCompletedOrCancelledExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
            this.uiService.loadingStateChanged.next(false);
        }));
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}