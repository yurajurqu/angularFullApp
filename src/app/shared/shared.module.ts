import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

const modules = [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
];
@NgModule({
    declarations: [],
    imports: modules,
    exports: modules
})
export class SharedModule {
    
}