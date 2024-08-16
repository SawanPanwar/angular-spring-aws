import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: any = {
    data: {},
    inputerror: {},
    message: '',
    preload: []
  }

  fileToUpload: any = null;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.form.data.id = params["id"];
      console.log(this.form.data.id)
    })
  }


  ngOnInit(): void {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
  }


  preload() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.get(`${apiUrl}/User/preload`).subscribe((res: any) => {
      console.log(res)
      this.form.preload = res.result.roleList;
    });
  }

  display() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.get(`${apiUrl}/User/get/` + this.form.data.id).subscribe((res: any) => {
      console.log(res)
      this.form.data = res.result.data;
    });
  }


  onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
  }

  save() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.post(`${apiUrl}/User/save`, this.form.data).subscribe((res: any) => {
      console.log('res => ', res)

      this.form.message = '';
      this.form.inputerror = {};

      if (res.result.message) {
        this.form.message = res.result.message;
      }

      if (!res.success) {
        this.form.inputerror = res.result.inputerror;
      }

      this.form.data.id = res.result.data;

      this.myFile();
    });
  }

  myFile() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpClient.post(`${apiUrl}/User/profilePic/` + this.form.data.id, formData).subscribe((res: any) => {
      console.log(this.fileToUpload);
    }, error => {
      console.log(error);
    });
  }
}
