/* eslint-disable @typescript-eslint/no-explicit-any */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getAuthData, logOutUser, selectIsAuthenticated } from '../../../authentication';
import { MainViewComponent } from './main-view.component';

describe('MainViewComponent', () => {
    let component: MainViewComponent;
    let fixture: ComponentFixture<MainViewComponent>;
    let store: MockStore;
    let selector: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;

    const initialAuthState = { isAuthenticated: false };
    const routes: Routes = [];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainViewComponent],
            providers: [provideMockStore({ initialState: initialAuthState })],
            imports: [
                RouterModule.forRoot(routes)
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        selector = store.overrideSelector(selectIsAuthenticated, false);

        fixture = TestBed.createComponent(MainViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch getAuthData on init', () => {
        spyOn(store, 'dispatch');
        component.ngOnInit();
        expect(store.dispatch).toHaveBeenCalledWith(getAuthData());
    });

    it('should display the logout button if authenticated', () => {
        store.overrideSelector(selectIsAuthenticated, true);
        store.refreshState();
        fixture.detectChanges();

        const logoutButton = fixture.debugElement.query(By.css('.logout-button'));
        expect(logoutButton).toBeTruthy();
    });

    it('should display the Auth View if not authenticated', () => {
        store.overrideSelector(selectIsAuthenticated, false);
        store.refreshState();
        fixture.detectChanges();

        const authView = fixture.debugElement.query(By.css('app-auth-view'));
        expect(authView).toBeTruthy();
    });

    it('should dispatch logOutUser when logout button is clicked', () => {
        spyOn(store, 'dispatch');

        selector.setResult(true);
        store.refreshState();

        fixture.detectChanges();

        const logoutButton = fixture.debugElement.query(By.css('.logout-button'));
        expect(logoutButton).toBeTruthy();
        logoutButton.nativeElement.click();

        expect(store.dispatch).toHaveBeenCalledWith(logOutUser());
    });
});