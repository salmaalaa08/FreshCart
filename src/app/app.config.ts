import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { setHeaderInterceptor } from './core/interceptors/header/set-header-interceptor';
import { errMsgInterceptor } from './core/interceptors/errorMsg/err-msg-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import {provideTranslateService, TranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";



export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideToastr(),
    importProvidersFrom([CookieService]),
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor, errMsgInterceptor, loadingInterceptor])),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
    provideRouter(routes, withViewTransitions()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
  ]
};
