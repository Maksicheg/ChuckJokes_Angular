import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { JokeCardComponent } from './../components/joke-card/joke-card.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { DateToHoursPipe } from './pipes/date-to-hours.pipe';

@NgModule({
  declarations: [JokeCardComponent, DateToHoursPipe, DragDropDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  exports: [
    JokeCardComponent,
    DateToHoursPipe,
    DragDropDirective,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
  ],
})
export class SharedModule {}
