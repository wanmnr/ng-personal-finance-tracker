// app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideToastr } from 'ngx-toastr';
import { layoutFeature } from './layout/store/layout.state';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error3.interceptor';
// import { provideEffects } from '@ngrx/effects';
import { paginationReducer } from '@shared/store/reducers/pagination.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { PaginationEffects } from '@shared/store/effects/pagination.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync(),
    provideToastr({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
    }),
    provideStore({
        [layoutFeature.name]: layoutFeature.reducer,
        pagination: paginationReducer,
        // Add more reducers here like:
    }),
    // If you add effects later:
    // provideEffects([PaginationEffects])
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
