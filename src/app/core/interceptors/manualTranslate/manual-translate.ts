import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ManualTranslate {
  constructor(private translate:TranslateService, private cookies:CookieService, @Inject(PLATFORM_ID) id:object){
    let defaultLang = 'en';
    if(isPlatformBrowser(id)){
      if(this.cookies.get('lang') !== null){
        defaultLang = this.cookies.get('lang')
      }
      this.changeLanguage(defaultLang);
    }
  }
  changeDirection(lang:string){
    if(lang === "en"){
      document.dir = 'ltr'
    } else if (lang === "ar"){
      document.dir = 'rtl'
    }
  }
  changeLanguage(lang:string){
    // Save to cookie or localStorage
    // localStorage.setItem('lang', lang)
    this.cookies.set('lang', lang);
    // Set fallback language
    this.translate.setFallbackLang(lang);
    // use apply language
    this.translate.use(lang);
    // change direction
    this.changeDirection(lang);
  }
}
