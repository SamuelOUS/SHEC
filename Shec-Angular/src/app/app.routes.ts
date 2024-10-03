import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MainLayoutComponentComponent } from './layouts/main-layout-component/main-layout-component.component';
import { DevicesComponent } from './features/devices/devices.component';
import { EnergyComponent } from './features/energy/energy.component';
import { StatsComponent } from './features/stats/stats.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  // Redirigir la ruta raíz ('/') al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rutas sin el layout de menú lateral
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  // Rutas con el layout de menú lateral
  {
    path: '',
    component: MainLayoutComponentComponent, // Aquí aplicas el layout para todas las páginas internas
    children: [
      { path: 'home', component: LandingPageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'energy', component: EnergyComponent }
    ]
  },

  // Redirección en caso de rutas desconocidas
  { path: '**', redirectTo: 'login' }
];
