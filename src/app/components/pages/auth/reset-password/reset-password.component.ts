import { timer } from 'rxjs';
import { AuthService } from './../../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export class FormPassword {
  password: string;
  confirmPassword: string;
}

export class UserData {
  userId: number;
  token: string;
}

export class UserDataToChangePassword {
  userId: number;
  token: string;
  password: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private userData: UserData;
  public notificationMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._subscribeToRouteQueryParams();
  }

  private _subscribeToRouteQueryParams(): void {
    this.route.queryParams.subscribe(
      (result: UserData) =>
        (this.userData = { ...result, userId: +result.userId })
    );
  }

  resetPassword(data: FormPassword) {
    const userDataToChangePassword: UserDataToChangePassword = {
      userId: this.userData.userId,
      token: this.userData.token,
      password: data.password,
    };
    this.authService
      .sendUserDataToGetPermissionToChangePassword(this.userData)
      .subscribe((response: boolean) => {
        response
          ? this.authService
              .changePassword(userDataToChangePassword)
              .subscribe((resp) => {
                console.log(resp);
                this.router.navigate(['/login']);
              })
          : console.log('error', response);
      });
  }
}
