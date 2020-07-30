import { timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public notificationMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  forgotPassword(formValue) {
    this.authService.resetPassword(formValue.email).subscribe(() => {
      // const notification = timer(3000);
      // notification.subscribe(
      //   (value) => (this.notificationMessage = `Notification ${value}`)
      // );
      this.notificationMessage = 'Please, check your email!';
    });
  }
}
