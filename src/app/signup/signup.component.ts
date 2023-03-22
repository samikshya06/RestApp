import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private _http:HttpClient, private router:Router){

  }
  ngOnInit(): void {
this.signUpForm = this.formBuilder.group({
  name: [''],
  email: [''],
  mobile: [''],
  password: [''],
})
    //throw new Error('Method not implemented.');
  }

  signUp(){
this._http.post<any>("http://localhost:3000/signup",this.signUpForm.value).subscribe({
  next: (v) => {
    alert("you have signed up successfully");
    this.signUpForm.reset();
    this.router.navigate(['login']);
    
  },
  error: (e) => {
    alert('something went wrong');
    console.error(e)
  },
  complete: () => console.info('complete')
});
  }

}
