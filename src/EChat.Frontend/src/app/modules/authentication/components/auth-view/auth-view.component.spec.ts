import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { signInUser } from '../..';
import { ValidationMessage } from '../../../shared';
import { AuthViewComponent } from './auth-view.component';

describe('AuthViewComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;
  let store: MockStore;
  let mockValidationMessageService: jasmine.SpyObj<ValidationMessage>;

  beforeEach(async () => {
    mockValidationMessageService = jasmine.createSpyObj('ValidationMessage', ['getValidationMessage']);
    mockValidationMessageService.getValidationMessage.and.returnValue({
      hasError: false,
      message: ''
    });

    await TestBed.configureTestingModule({
      declarations: [AuthViewComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore(),
        { provide: ValidationMessage, useValue: mockValidationMessageService },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with a default value and be valid', () => {
    expect(component.nameInput.value).toBe('Jonh Doe');
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should mark the form as touched and not dispatch if invalid', () => {
    spyOn(store, 'dispatch');
    component.nameInput.setValue('');
    component.registerUser();

    expect(component.formGroup.touched).toBeTrue();
    expect(component.nameInput.hasError('required')).toBeTrue();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch signInUser action when the form is valid', () => {
    spyOn(store, 'dispatch');
    component.nameInput.setValue('Jane Doe');
    component.registerUser();

    expect(store.dispatch).toHaveBeenCalledWith(
      signInUser({ name: 'Jane Doe' })
    );
  });

  it('should be error message if input is invalid', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.blur();
    fixture.detectChanges();

    expect(component.formGroup.valid).toBeFalse();
    expect(component.nameInput.hasError('required')).toBeTrue();
  });

  it('should call validateInput.getValidationMessage on input validation', () => {
    component.nameInput.setValue('');
    component.validateInputField(component.nameInput);

    expect(mockValidationMessageService.getValidationMessage).toHaveBeenCalledWith(component.nameInput);
  });
});