import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import * as fromTraining from"./training.reducer"
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining :Observable<boolean>;
  subscriptionExercise: Subscription;
  constructor(private store:Store<fromTraining.State>) {}

  ngOnInit(): void {
   this.ongoingTraining= this.store.select(fromTraining.getIsTraining);
   console.log(this.ongoingTraining);
   
    // this.subscriptionExercise = this.trainingService.exerciseChanged.subscribe(
    //   (exercise) => {
    //     exercise
    //       ? (this.ongoingTraining = true)
    //       : (this.ongoingTraining = false);
    //   }
    // );
  }
 
}
