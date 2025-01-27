import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'news-visor-frontend';
  apiMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ message: string }>('http://localhost:3000/api').subscribe({
      next: (data) => {
        this.apiMessage = data.message;
      },
      error: (err) => {
        console.error('Error fetching API message', err);
      }
    });
  }
}
