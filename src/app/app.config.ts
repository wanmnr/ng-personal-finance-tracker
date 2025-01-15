// app.config.ts

// Angular Core imports
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Third-party library imports
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

// Application imports
import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error3.interceptor';
import { layoutFeature } from './layout/store/layout.state';
import { paginationReducer } from '@shared/store/reducers/pagination.reducer';
// import { PaginationEffects } from '@shared/store/effects/pagination.effects';
// import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideStore({
      [layoutFeature.name]: layoutFeature.reducer,
      pagination: paginationReducer,
      // Add more reducers here like:
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (library: FaIconLibrary) => {
        return () => {
          library.addIconPacks(fas);
        };
      },
      deps: [FaIconLibrary],
      multi: true,
    },
    // If you add effects later:
    // provideEffects([PaginationEffects])
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
