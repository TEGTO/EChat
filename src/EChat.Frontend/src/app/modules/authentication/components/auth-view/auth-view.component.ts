import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signInUser } from '../..';
import { ValidationMessage } from '../../../shared';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrl: './auth-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthViewComponent implements OnInit {
  formGroup!: FormGroup;

  get nameInput() { return this.formGroup.get('name')! as FormControl; }

  constructor(private readonly validateInput: ValidationMessage, private readonly store: Store,) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        name: new FormControl('Jonh Doe', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      });
  }

  registerUser() {
    if (this.formGroup.valid) {

      this.store.dispatch(signInUser({
        name: this.nameInput.value
      }));

    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateInputField(input: AbstractControl<any, any>) {
    return this.validateInput.getValidationMessage(input);
  }
}
