import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form: any = {
    data: {},
    message: '',
    inputerror: {}
  }


  constructor(private httpClient: HttpClient) {

  }

  signUp() {

    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.post(`${apiUrl}/Auth/signUp`, this.form.data).subscribe((res: any) => {
      console.log('res => ', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }
    })
  }

}
