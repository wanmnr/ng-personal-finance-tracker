import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';

// Define your routes here
export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: '**', redirectTo: '' } // Wildcard route for invalid paths
];