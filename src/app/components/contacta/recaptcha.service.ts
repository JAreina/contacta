import { Injectable, InjectionToken, Inject } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export const RECAPTCHA_URL = new InjectionToken('RECAPTCHA_URL');

@Injectable()
export class ReCaptchaAsyncValidator {

  constructor( private http : Http, @Inject(RECAPTCHA_URL) private url ) {
  }

  validateToken( token : string ) {
    return ( _ : AbstractControl ) => {
      return this.http.get(this.url, { params: { token } }).map(res => res.json()).map(res => {
        if( !res.success ) {
          return { tokenInvalid: true }
        }
        return null;
      });
    }
  }
}