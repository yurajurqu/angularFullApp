import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training',trainingReducer)
    ],
    exports:[]
})
export class TrainingModule {
    
}