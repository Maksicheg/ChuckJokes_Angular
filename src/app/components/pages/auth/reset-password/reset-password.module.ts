import { AuthFormModule } from './../auth-form/auth-form.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../../shared/shared.module';
import { ResetPasswordComponent } from './reset-password.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: ResetPasswordComponent }];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [SharedModule, AuthFormModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordModule {}
