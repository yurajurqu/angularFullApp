import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { TrainingComponent } from "./training.component";


const routes: Routes = [
    {path:'',component: TrainingComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class TrainingRoutingModule { }