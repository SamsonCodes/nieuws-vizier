import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url: string = '';
  title: string = '';
  keyword: string = '';
  noResultMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    const params = this.keyword ? { params: { keyword: this.keyword } } : {};
    this.http.get<any>('http://localhost:3000/api', params).subscribe({
      next: (data) => {
        if (data.news && data.news.length > 0) {
          this.noResultMessage = '';
          this.title = data.news[0].title;
          this.url = data.news[0].url;
        } else {
          this.noResultMessage = data.message || 'No news results found.';
          this.title = '';
          this.url = '';
        }
        console.log(data);
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
