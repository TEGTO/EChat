import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageService } from './validation-message.service';

describe('ValidationMessageService', () => {
  let service: ValidationMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ValidationMessageService]
    });
    service = TestBed.inject(ValidationMessageService);
  });

  const testCases: { errorKey: string, expectedMessage: string }[] = [
    { errorKey: 'required', expectedMessage: "Field is required." },
  ];

  testCases.forEach(({ errorKey, expectedMessage }) => {
    it(`getValidationMessage with ${errorKey} error returns correct message`, () => {
      const control = new FormControl();
      control.setErrors({ [errorKey]: true });

      const result = service.getValidationMessage(control as AbstractControl);
      expect(result).toEqual({ hasError: true, message: expectedMessage });
    });
  });

  it('getValidationMessage with no errors returns empty message', () => {
    const control = new FormControl();
    const result = service.getValidationMessage(control as AbstractControl);
    expect(result).toEqual({ hasError: false, message: "" });
  });
});
