import { Directive, Input, ElementRef, OnInit, NgZone,AfterViewInit, Injector, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReCaptchaAsyncValidator } from './contacta/recaptcha.service';


export interface ReCaptchaConf{
theme?: 'dark' | 'light';
type?: 'audio' | 'image';
size? : 'compact' | 'normal';

}
declare const grecaptcha : any;

declare global {
  interface Window {
    grecaptcha : any;
    reCaptchaLoad : () => void
  }
}
@Directive({
  selector: '[appContacta]',
  exportAs: 'nbRecaptcha',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactaDirective),
      multi: true
    },
    ReCaptchaAsyncValidator
]
})
export class ContactaDirective implements OnInit,  ControlValueAccessor,AfterViewInit {

  private control:FormControl;
  ngAfterViewInit(): void {
    this.control = this.injector.get(NgControl).control;
    this.setValidator();
  }
  private setValidator() {
    this.control.setValidators(Validators.required);
    this.control.updateValueAndValidity();
  }


@Input() key : string;
@Input() config : ReCaptchaConf ={};
@Input() lang : string;

private widgetId : number;


onChange ( value : string ){
         
} 

onTouched ( value : string ) {
  
}

  constructor( private element : ElementRef ,                        private ngZone: NgZone,                        private injector:Injector,                     private reCaptchaAsyncValidator : ReCaptchaAsyncValidator) {}

  ngOnInit() {
    this.registerReCaptchaCallback();
    this.addScript();
}
writeValue(obj: any): void {

}
registerOnChange(fn: any): void {
  this.onChange=fn;
}
registerOnTouched(fn: any): void {
  this.onTouched=fn;
}
setDisabledState?(isDisabled: boolean): void {
  
}



registerReCaptchaCallback() {
  window.reCaptchaLoad = () => {
    const config = {
      ...this.config,
      'sitekey': this.key,
      'callback': this.onSuccess.bind(this),
      'expired-callback': this.onExpired.bind(this)
    };
    this.widgetId = this.render(this.element.nativeElement, config);
  };
}
onExpired() {
  this.ngZone.run(() => {
    
    this.onChange(null);
    this.onTouched(null);
  });
}

onSuccess( token : string ) {
  console.log("TOKEN" +token);
  this.ngZone.run(() => {
    this.onChange(token);
    this.onTouched(token);
  });
}
private render( element : HTMLElement, config ) : number {
  return grecaptcha.render(element, config);
}


addScript() {
  let script = document.createElement('script');
  const lang = this.lang ? '&hl=' + this.lang : '';
  script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit${lang}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}


verifyToken( token : string ) {
  this.control.setAsyncValidators(this.reCaptchaAsyncValidator.validateToken(token))
  this.control.updateValueAndValidity();
}
}