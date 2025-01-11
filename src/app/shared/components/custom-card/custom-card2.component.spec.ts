// shared/components/custom-card/custom-card.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomCardComponent } from './custom-card2.component';
import { CardAction, CustomCardInputs } from './models/custom-card2.types';
import { CustomCardViewModel } from './models/custom-card2.view-model';
import { CARD_DEFAULTS } from './models/custom-card2.constants';
import { BehaviorSubject } from 'rxjs';

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;
  let viewModel: CustomCardViewModel;

  const mockState$ = new BehaviorSubject<CustomCardInputs>({
    title: 'Test Card',
    loading: false,
    error: null,
    theme: 'light',
    size: 'md',
    elevation: 2
  });

  const mockViewModel = {
    state$: mockState$.asObservable(),
    containerClasses$: new BehaviorSubject(['default-class']),
    updateState: jasmine.createSpy('updateState')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomCardComponent,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        FontAwesomeModule
      ],
      providers: [
        { provide: CustomCardViewModel, useValue: mockViewModel }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    viewModel = TestBed.inject(CustomCardViewModel);

    component.title = 'Test Card';
    component.containerClass = 'test-container';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const titleElement = fixture.nativeElement.querySelector('mat-card-title');
    expect(titleElement.textContent.trim()).toBe('Test Card');
  });

  it('should render subtitle when provided', () => {
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const subtitleElement = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitleElement.textContent.trim()).toBe('Test Subtitle');
  });

  it('should emit action when triggered', () => {
    const action: CardAction = {
      id: 'test-action',
      label: 'Test',
      ariaLabel: 'Test Action',
      handler: jasmine.createSpy('handler')
    };

    component.actions = [action];
    fixture.detectChanges();

    spyOn(component.actionTriggered, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.actionTriggered.emit).toHaveBeenCalledWith(action);
    expect(action.handler).toHaveBeenCalled();
  });

  it('should not trigger actions when loading', () => {
    const action: CardAction = {
      id: 'test-action',
      label: 'Test',
      ariaLabel: 'Test Action',
      handler: jasmine.createSpy('handler')
    };

    component.actions = [action];
    component.loading = true;
    fixture.detectChanges();

    spyOn(component.actionTriggered, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.actionTriggered.emit).not.toHaveBeenCalled();
    expect(action.handler).not.toHaveBeenCalled();
  });

  it('should update view model state on init', () => {
    component.ngOnInit();

    expect(mockViewModel.updateState).toHaveBeenCalledWith({
      title: 'Test Card',
      theme: CARD_DEFAULTS.THEME,
      size: CARD_DEFAULTS.SIZE,
      elevation: CARD_DEFAULTS.ELEVATION,
      loading: false,
      error: null
    });
  });

  it('should show loading spinner when loading is true', () => {
    mockState$.next({ ...mockState$.value, loading: true });
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show error message when error is present', () => {
    const errorMessage = 'Test error message';
    mockState$.next({ ...mockState$.value, error: errorMessage });
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('[role="alert"]');
    expect(errorElement.textContent.trim()).toBe(errorMessage);
  });

  it('should apply correct data attributes', () => {
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.getAttribute('data-theme')).toBe(CARD_DEFAULTS.THEME);
    expect(card.getAttribute('data-size')).toBe(CARD_DEFAULTS.SIZE);
    expect(card.getAttribute('data-elevation')).toBe(CARD_DEFAULTS.ELEVATION.toString());
  });

  it('should apply correct accessibility attributes', () => {
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.getAttribute('role')).toBe('article');
    expect(card.getAttribute('aria-busy')).toBe('false');
    expect(card.getAttribute('aria-disabled')).toBe('false');
  });

  it('should render actions in correct order', () => {
    const actions: CardAction[] = [
      {
        id: 'action-1',
        label: 'First',
        ariaLabel: 'First Action'
      },
      {
        id: 'action-2',
        label: 'Second',
        ariaLabel: 'Second Action'
      }
    ];

    component.actions = actions;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].textContent.trim()).toBe('First');
    expect(buttons[1].textContent.trim()).toBe('Second');
  });

  it('should apply container classes from view model', () => {
    const newClasses = ['custom-class-1', 'custom-class-2'];
    mockViewModel.containerClasses$.next(newClasses);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('mat-card');
    newClasses.forEach(className => {
      expect(card.classList.contains(className)).toBe(true);
    });
  });
});
