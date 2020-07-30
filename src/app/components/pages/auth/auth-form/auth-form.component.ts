import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Role } from 'src/app/shared/models/user.model';
import { AuthInterface } from './../../../../shared/interfaces/auth.interface';
import { ComparePassword } from './../../../../shared/validators/password-compare.validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  public form: FormGroup;
  public role = Role;
  public hidePassword = true;
  @Input() isRegisterMode: boolean;
  @Input() forgotPasswordMode: boolean;
  @Input() resetPasswordMode: boolean;
  @Output() submitForm = new EventEmitter<AuthInterface>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (this.isRegisterMode) {
      this.form.addControl(
        'firstName',
        new FormControl('', [Validators.required, Validators.minLength(2)])
      );
      this.form.addControl(
        'lastName',
        new FormControl('', [Validators.minLength(2)])
      );
      this.form.addControl('roles', new FormControl(null));
    }
    if (this.forgotPasswordMode) {
      this.form.removeControl('password');
    }
    if (this.resetPasswordMode) {
      this.form = this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        {
          validator: ComparePassword('password', 'confirmPassword'),
        }
      );
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      // if there is any role convert roles: Role to roles: [Role]
      if (this.form.value.roles) {
        this.form.value.roles = [this.form.value.roles];
      }
      this.submitForm.emit(this.form.value);
    }
  }
}
