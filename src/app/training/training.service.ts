import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import  'rxjs/add/operator/map';

@Injectable()
export class TrainingService {

    constructor(private db: AngularFirestore) {
    }

    startExerciseSubject = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

 
    availableExercises =[];

    private runningExercise: Exercise;
    private exercises: Exercise[] =[];

    fetchAvailableExercises() {
        this.db.collection('availableExercises')
            .snapshotChanges()
            .map(docArray => {
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
            });
      ;
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.startExerciseSubject.next({...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.startExerciseSubject.next(null);
    }
    cancelExercise(progress: number) {
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'cancelled', duration: this.runningExercise.duration*(progress/100), calories:this.runningExercise.calories*(progress/100) });
        this.runningExercise = null;
        this.startExerciseSubject.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }
    getPastExercises() {
        return [...this.exercises];
    }
}