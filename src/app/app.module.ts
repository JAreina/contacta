import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactaComponent } from './components/contacta/contacta.component';
import { ContactaDirective } from './components/contacta.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReCaptchaAsyncValidator } from './components/contacta/recaptcha.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactaComponent,
    ContactaDirective,
    
  ],
  imports: [
    BrowserModule,
  ReactiveFormsModule,HttpModule
  
  ],
  providers: [ReCaptchaAsyncValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
