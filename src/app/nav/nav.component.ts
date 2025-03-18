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


  isUserConnected(): boolean {
    const role = sessionStorage.getItem('role');
    console.log("dans isUserCONNECTED : " + role);
    return role !== null;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  changeRole(): void {
    const currentRole = sessionStorage.getItem('role');
    if (currentRole === 'admin') {
        sessionStorage.setItem('role', 'user');
    } else {
        sessionStorage.setItem('role', 'admin');
    }
    window.location.reload();
}

logout(): void {
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']); 
}


}
