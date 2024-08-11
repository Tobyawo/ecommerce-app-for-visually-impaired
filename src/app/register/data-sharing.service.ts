import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private email: string;
  private password: string;

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }
}
