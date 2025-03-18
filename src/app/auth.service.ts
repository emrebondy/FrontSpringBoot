import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roleKey = 'role';

  constructor() {}

  getRole(): string | null {
    return sessionStorage.getItem(this.roleKey);
  }

  setRole(role: string): void {
    sessionStorage.setItem(this.roleKey, role);
  }

  clearRole(): void {
    sessionStorage.removeItem(this.roleKey);
  }
}
