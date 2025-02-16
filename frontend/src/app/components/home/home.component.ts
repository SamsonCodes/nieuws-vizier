import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  url: string | undefined;
  title: string | undefined;
  keyword: string | undefined;
  noResultMessage: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.fetchNews();
  }

  fetchNews(): void {
    console.log('Fetching news...');
    const params = this.keyword ? { params: { keyword: this.keyword } } : {};
    this.http.get<any>('http://localhost:3000/api', params).subscribe({
      next: (data) => {
        if (data.news && data.news.length > 0) {
          this.noResultMessage = undefined;
          this.title = data.news[0].title;
          this.url = data.news[0].url;
        } else {
          this.noResultMessage = data.message || 'No news results found.';
          this.title = undefined;
          this.url = undefined;
        }
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.error);
        this.noResultMessage = err.error.error || 'An error occurred while fetching the news.';
        this.title = undefined;
        this.url = undefined;
      }
    });
  }

  search(): void {
    this.fetchNews();
  }
}
