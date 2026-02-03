import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor'; // Importih

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //  Hna fin kan-zido l'interceptor
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
