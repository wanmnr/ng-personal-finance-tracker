// app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideToastr } from 'ngx-toastr';
import { layoutFeature } from './layout/store/layout.state';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error3.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor]),
      // withInterceptors([cacheInterceptor])
    ),
    provideAnimationsAsync(),
    provideToastr({      // ToastrModule configuration
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    provideStore({ [layoutFeature.name]: layoutFeature.reducer }),
    provideEffects(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
  ],
};
