import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), 
    { provide : HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true} // Import HttpClientModule here
    // Add other global providers if needed
  ]
})
  .catch(err => console.error(err));
