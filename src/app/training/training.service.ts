import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import {  Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import { UIService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import { SetAvailableTrainings, SetFinishedTrainings, StartTraining, StopTraining } from './training.actions';
import * as fromTraining from './training.reducer'
@Injectable()
export class TrainingService {
  constructor(private db: AngularFirestore, private uiService: UIService,private store:Store<fromTraining.State>) {}
  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  // ];
  //private runningExercise: Exercise;
  //  private exercises: Exercise[] = [];
  private fbSub: Subscription[] = [];
 
  fetchAvailableExercises() {
    this.store.dispatch(new StartLoading())
    //this.uiService.loadingStateChanged.next(true);
    this.fbSub.push(
      this.db
        .collection('availabeExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              const id = doc.payload.doc.id;
              const data = doc.payload.doc.data() as Exercise;
              return { id, ...data };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new StopLoading())
           // this.uiService.loadingStateChanged.next(false);
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...exercises]);
            this.store.dispatch(new SetAvailableTrainings(exercises))
          },
          (error) => {this.store.dispatch(new StopLoading())
            //this.uiService.loadingStateChanged.next(false);
           // this.exercisesChanged.next(null);
            this.uiService.showSnackBar(
              'Fetching Exercises failed , please try again later',
              null,
              3000
            );
          }
        )
    );
  }
 
  fetchCompletedOrCanceledExercise() {
    this.fbSub.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises) => {
          
          this.store.dispatch(new SetFinishedTrainings(exercises as Exercise[]))
        })
    );
  }
  startExercise(selectedId: string) {
    this.store.dispatch(new StartTraining(selectedId))
    // this.runningExercise = this.availableExercises.find(
    //   (ex) => ex.id === selectedId
    // );
    // this.exerciseChanged.next(this.runningExercise);
  }
  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(runningExercise=>{

      
      this.addDataToDataBase({
        ...runningExercise,
        date: new Date(),
        state: 'completed',
      });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new StopTraining())
    })
  }
  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(runningExercise=>{

      this.addDataToDataBase({
        ...runningExercise,
        duration: runningExercise.duration * (progress / 100),
        calories: runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.store.dispatch(new StopTraining())
    })
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
  }
  cancelSubscriptions() {
    this.fbSub.forEach((subscription) => subscription.unsubscribe());
  }
  private addDataToDataBase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
