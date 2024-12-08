import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthData, selectIsAuthenticated } from '../../../authentication';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAuthData());
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }
}