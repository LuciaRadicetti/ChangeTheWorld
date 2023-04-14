import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UppercaseDirective } from './directive/uppercase.directive';

@NgModule({
  declarations: [
    ModalComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ModalComponent, UppercaseDirective],
})
export class SharedModule { }
