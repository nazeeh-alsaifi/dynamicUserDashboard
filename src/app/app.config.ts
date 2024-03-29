import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './core/reducers/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './core/effects/user.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimations(),
  provideHttpClient(),
  provideStore(),
  provideState('users', userReducer),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects(UserEffects)]
};
