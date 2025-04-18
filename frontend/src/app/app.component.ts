import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appName = 'NieuwsVizier';
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
