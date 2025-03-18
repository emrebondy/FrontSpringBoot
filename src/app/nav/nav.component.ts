import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  imports: [NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router: Router, private authService:AuthService) {}


  // Vérifie si un rôle est présent dans le localStorage
  isUserConnected(): boolean {
    const role = sessionStorage.getItem('role'); // Utilisation de sessionStorage
    console.log("dans isUserCONNECTED : " + role);
    return role !== null;
  }

  // Redirige vers la page de connexion
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Change de rôle (par exemple, admin -> user ou inversement)
  changeRole(): void {
    const currentRole = sessionStorage.getItem('role');
    if (currentRole === 'admin') {
        sessionStorage.setItem('role', 'user');
    } else {
        sessionStorage.setItem('role', 'admin');
    }
    // Optionnellement, recharger la page pour appliquer les changements immédiatement
    window.location.reload();
}

// Déconnexion de l'utilisateur
logout(): void {
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);  // Redirige vers la page de connexion
}


}
