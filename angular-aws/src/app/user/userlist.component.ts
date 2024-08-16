import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  form: any = {
    list: [],
    searchParams: {},
    deleteParams: {},
    preload: [],
    message: '',
    pageNo: 0
  }

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.preload();
    this.search();
  }

  next() {
    this.form.pageNo++;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  previous() {
    this.form.pageNo--;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  preload() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.get(`${apiUrl}/User/preload`).subscribe((res: any) => {
      this.form.preload = res.result.roleList;
    });
  }

  search() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.post(`${apiUrl}/User/search/` + this.form.pageNo, this.form.searchParams).subscribe((res: any) => {
      this.form.list = res.result.data;
    })
  }

  edit(page: any) {
    this.router.navigateByUrl(page);
  }

  onCheckboxChange(userId: number) {
    console.log('Checkbox with ID', userId, 'is checked/unchecked');
    this.form.deleteParams.id = userId;
  }

  delete() {
    const apiUrl = environment.apiUrl;
    console.log('API URL:', apiUrl);

    this.httpClient.get(`${apiUrl}/User/delete/` + this.form.deleteParams.id).subscribe((res: any) => {
      this.form.message = res.result.message;
      console.log('message => ', this.form.message)
      this.form.pageNo = 0;
      this.search();
    });

  }

}
