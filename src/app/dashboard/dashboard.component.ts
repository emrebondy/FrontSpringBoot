import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AnnonceService } from '../service/annonce.service';
import { EntitiesAnnonce } from '../../entities/EntitiesAnnonce';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string | null = '';
  annonces: EntitiesAnnonce[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private annonceService: AnnonceService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.fetchAnnonces();
  }

  fetchAnnonces(): void {
    this.annonceService.getAnnonces().subscribe(data => {
      this.annonces = data;
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/detailAnnonce', id]);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/modifierAnnonce', id]);
  }

  deleteAnnonce(id: number): void {
    if (this.role !== 'admin') {
      alert("Vous n'avez pas la permission de supprimer cette annonce !");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      this.annonceService.deleteAnnonce(id).subscribe(() => {
        this.annonces = this.annonces.filter(a => a.id !== id);
        alert("Annonce supprimée avec succès !");
      });
    }
  }

}
