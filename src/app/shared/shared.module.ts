// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MemoizedPipe } from './pipes/performance-optimized.pipe';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MemoizedPipe
  ],
  exports: [
    ButtonComponent,
    MemoizedPipe
  ]
})
export class SharedModule { }
