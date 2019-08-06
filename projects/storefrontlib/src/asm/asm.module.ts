import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsmComponentComponent } from './asm-component/asm-component.component';
@NgModule({
  declarations: [AsmComponentComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AsmComponentComponent],
})
export class AsmModule {}
