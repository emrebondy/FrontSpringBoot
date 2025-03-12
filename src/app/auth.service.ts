import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roleKey = 'role';  // Clé de stockage du rôle dans sessionStorage

  constructor() {}

  // Récupérer le rôle depuis sessionStorage
  getRole(): string | null {
    return sessionStorage.getItem(this.roleKey);
  }

  // Définir le rôle dans sessionStorage
  setRole(role: string): void {
    sessionStorage.setItem(this.roleKey, role);
  }

  // Effacer le rôle de sessionStorage
  clearRole(): void {
    sessionStorage.removeItem(this.roleKey);
  }
}
