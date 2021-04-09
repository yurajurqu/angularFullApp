import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path:'',component: WelcomeComponent },
    { path: 'training', loadChildren: () => import('src/app/training/training.module').then(m => m.TrainingModule) }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }