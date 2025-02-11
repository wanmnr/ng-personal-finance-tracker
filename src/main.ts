// main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Enable production mode before bootstrapping the application
if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// Traditional Bootstrap Module
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
