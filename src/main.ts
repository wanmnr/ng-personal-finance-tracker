// main.ts
import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (!isDevMode()) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error('Error bootstrapping app:', err)
);

// Traditional Bootstrap Module
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
