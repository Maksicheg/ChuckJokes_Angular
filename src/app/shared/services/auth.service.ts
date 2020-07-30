import { UserDataToChangePassword } from './../../components/pages/auth/reset-password/reset-password.component';
import { environment } from './../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthInterface } from '../interfaces/auth.interface';
import { UserData } from 'src/app/components/pages/auth/reset-password/reset-password.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.authUrl;
  private currentUserSubject: BehaviorSubject<AuthInterface>;
  public currentUser: Observable<AuthInterface>;
  private localStorageUserData = 'currentUser';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthInterface>(
      JSON.parse(localStorage.getItem(this.localStorageUserData))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthInterface {
    return this.currentUserSubject.value;
  }

  public login(data: object): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(`${this.authUrl}/signin`, data).pipe(
      map((response: AuthInterface) => {
        if (response && response.token) {
          localStorage.setItem(
            this.localStorageUserData,
            JSON.stringify(response)
          );
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  public register(data: object): Observable<boolean> {
    return this.http.post<boolean>(`${this.authUrl}/signup`, data);
  }

  public logout(): void {
    localStorage.removeItem(this.localStorageUserData);
    this.currentUserSubject.next(null);
  }

  public resetPassword(email: string): Observable<any> {
    const data: object = {
      email,
      resetPageUrl: `${window.location.origin}/reset-password`,
    };
    return this.http.post<any>(`${this.authUrl}/resetPasswordRequest`, data);
  }

  public sendUserDataToGetPermissionToChangePassword(
    userData: UserData
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.authUrl}/verifyResetPasswordToken?UserId=${userData.userId}&Token=${userData.token}`
    );
  }

  public changePassword(userData: UserDataToChangePassword): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/changePassword`, userData);
  }
}
