import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }

  constructor(private httpClient: HttpClient, public router: Router) {

  }


  signIn() {

    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.post(`${apiUrl}/Auth/login`, this.form.data).subscribe((res: any) => {

      console.log('res => ', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }

      if (res.success && res.result.data != null) {
        localStorage.setItem('firstName', res.result.data.firstName)
        localStorage.setItem('roleName', res.result.data.roleName)
        localStorage.setItem('id', res.result.data.id)
        this.router.navigateByUrl('welcome');
      }
    })
  }

  signUp() {
    this.router.navigateByUrl('signup');
  }

}