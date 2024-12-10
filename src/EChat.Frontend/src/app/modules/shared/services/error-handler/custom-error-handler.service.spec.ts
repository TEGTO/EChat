import { TestBed } from "@angular/core/testing";
import { SnackbarManager } from "../snackbar-manager/snackbar-manager.service";
import { CustomErrorHandler } from "./custom-error-handler.service";

describe('CustomErrorHandler', () => {
    let service: CustomErrorHandler;
    let mockSnackbarManager: jasmine.SpyObj<SnackbarManager>;

    beforeEach(() => {
        mockSnackbarManager = jasmine.createSpyObj<SnackbarManager>(['openErrorSnackbar']);

        TestBed.configureTestingModule({
            imports: [],
            providers: [
                { provide: SnackbarManager, useValue: mockSnackbarManager },
            ]
        });
        service = TestBed.inject(CustomErrorHandler);
    });

    it('should log the error message in handleHubError', () => {
        spyOn(console, 'error');
        const error = {
            message: 'An error occurred'
        };
        service.handleHubError(error);
        expect(console.error).toHaveBeenCalledWith('An error occurred');
        expect(mockSnackbarManager.openErrorSnackbar).toHaveBeenCalledWith([error.message]);
    });
});