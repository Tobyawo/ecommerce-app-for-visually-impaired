import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<any>;

  invalidForm: boolean;

  private apiUrl = 'https://f702-69-18-37-194.ngrok-free.app';

  constructor(private http: HttpClient,private fAuth: AngularFireAuth, private router: Router, private zone: NgZone) { 

  }


    // Register a new user by calling the Flask endpoint
    signUp(email: string, password: string) {
      const payload = { email, password };
      this.http.post(`${this.apiUrl}/register`, payload).pipe(
        catchError(err => {
          console.error('Registration failed:', err);
          alert('Failed to register. Please try again.');
          return of(null); // Return an observable to prevent breaking the stream
        })
      ).subscribe(response => {
        if (response) {
          console.log('User registered successfully:', response);
          alert('User registered successfully!');
        }
      });
    }
  
    // Login an existing user by calling the Flask endpoint
    login(email: string, password: string) {
      const payload = { email, password };
      this.http.post(`${this.apiUrl}/login`, payload).pipe(
        catchError(err => {
          console.error('Login failed:', err);
          alert('Failed to log in. Please check your credentials.');
          return of(null); // Return an observable to prevent breaking the stream
        })
      ).subscribe(response => {
        if (response) {
          console.log('User logged in successfully:', response);
          alert('Login successful!');
          this.invalidForm = false;
          // Navigate to the checkout page
          this.zone.run(() => this.router.navigateByUrl('/cart/checkout'));
        }
      });
    }

  signOut() {
    this.fAuth.auth.signOut();
  }

  loggedIn() {
    return this.fAuth.authState;
  }

}
