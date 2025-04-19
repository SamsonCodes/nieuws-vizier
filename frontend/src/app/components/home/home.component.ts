import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: { title: string; url: string; summary: string }[] = [];
  keyword: string | undefined;
  noResultMessage: string | undefined;

  constructor(private http: HttpClient) {}

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
          this.news = data.news.map((item: any) => ({
            title: item.title,
            url: item.url,
            summary: item.summary || 'No summary available'
          }));
        } else {
          this.noResultMessage = data.message || 'No news results found.';
          this.news = [];
        }
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.error);
        this.noResultMessage = err.error.error || 'An error occurred while fetching the news.';
        this.news = [];
      }
    });
  }

  search(): void {
    this.fetchNews();
  }
}
