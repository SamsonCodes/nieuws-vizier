import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  url: string = '';
  title: string = '';
  keyword: string = ''; // Add keyword property

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    const params = this.keyword ? { params: { keyword: this.keyword } } : {};
    this.http.get<any>('http://localhost:3000/api', params).subscribe({
      next: (data) => {
        console.log(data);
        this.title = data.news[0].title;
        this.url = data.news[0].url;
      },
      error: (err) => {
        console.error('Error fetching API message', err);
      }
    });
  }

  search(): void {
    this.fetchNews();
  }
}
