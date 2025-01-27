import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
