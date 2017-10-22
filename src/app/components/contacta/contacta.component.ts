import { Component, OnInit } from '@angular/core';
import { RECAPTCHA_URL } from './recaptcha.service';
import { FormGroup, FormControl, Validators, FormsModule,NgControl } from '@angular/forms';

@Component({
  selector: 'app-contacta',
  templateUrl: './contacta.component.html',
  styleUrls: ['./contacta.component.css'],
  providers: [
    
    {
    provide: RECAPTCHA_URL,
    useValue: 'http://localhost:3000/validate_captcha'
  }]
})
export class ContactaComponent implements OnInit {
  signin = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    captcha: new FormControl(null,Validators.required),
  });
  constructor() { }

  ngOnInit() {
  }


  onSubmit(form:FormGroup){
        console.log(this.signin.value.email +"   "+   this.signin.value.password );
       alert(this.signin.value.email +"   "+   this.signin.value.password)
  }
}
