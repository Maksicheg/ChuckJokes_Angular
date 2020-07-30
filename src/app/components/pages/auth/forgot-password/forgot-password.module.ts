import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../../shared/shared.module';
import { AuthFormModule } from '../auth-form/auth-form.module';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [{ path: '', component: ForgotPasswordComponent }];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [SharedModule, AuthFormModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordModule {}
