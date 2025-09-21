import { Component, signal } from '@angular/core';
import { Navbar } from "./shared/components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";
import { Footer } from "./shared/components/footer/footer";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, NgxSpinnerComponent, Footer, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('freshcart');

  constructor(public translate:TranslateService){}
  
}
