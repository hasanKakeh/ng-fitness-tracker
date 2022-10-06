import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from "../training.reducer"
import { Store } from '@ngrx/store';
import { getIsLoading } from 'src/app/app.reducer';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  selected: any;
  constructor(
    private trainingService: TrainingService,
   
    private store:Store<fromTraining.State>
  ) {}
  Exercises: Observable <Exercise[]>;
 
  isLoading: Observable <boolean> 

  ngOnInit(): void {
    this.Exercises=this.store.select(fromTraining.getAvailableExercises);
    this.isLoading=this.store.select(getIsLoading)
    // this.exercisesSubscription =
    //   this.trainingService.exercisesChanged.subscribe((exercises) => {
    //     this.Exercises = exercises;
    //   });
    // this.exercisesSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (loadingState) => {
    //     this.isLoading = loadingState;
    //   }
    //);
    this.fetchExercises();
  }
  onStartTraining() {
    this.trainingService.startExercise(this.selected);
  }
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
 
}
