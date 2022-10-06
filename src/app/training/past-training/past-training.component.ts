import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from "../training.reducer"
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit {
  dataSource = new MatTableDataSource<Exercise>();
 
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService,private store:Store<fromTraining.State>) {}

  ngOnInit(): void {
    // this.exChangedSubscription =
    //   this.trainingService.finishedExercisesChanged.subscribe(
    //     (exercises: Exercise[]) => {
    //       this.dataSource.data = exercises;
    //     }
    //   );
  this.store.select(fromTraining.getFinishedExercises).subscribe(ex=>{
    this.dataSource.data=ex
    })
    this.trainingService.fetchCompletedOrCanceledExercise();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
  
}
