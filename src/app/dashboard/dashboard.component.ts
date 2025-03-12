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
  role: string | null = '';  // Variable pour stocker le rôle
  annonces: EntitiesAnnonce[] = [];
  selectedAnnonce: EntitiesAnnonce | null = null;
  editMode: boolean = false;

  constructor(private authService: AuthService, private router: Router, private annonceService: AnnonceService) {
    
  }


  ngOnInit(): void {
    this.role = this.authService.getRole();
    console.log("voici le role : " + this.role)
    this.fetchAnnonces();
  }

  fetchAnnonces(): void {
    this.annonceService.getAnnonces().subscribe(data => {
      this.annonces = data;
    });
  }

  selectAnnonce(annonce: EntitiesAnnonce): void {
    this.selectedAnnonce = annonce;
    this.editMode = false;
  }

  deleteAnnonce(id: number): void {
    this.annonceService.deleteAnnonce(id).subscribe(() => {
      this.annonces = this.annonces.filter(a => a.id !== id);
      this.selectedAnnonce = null;
    });
  }

  enableEdit(): void {
    this.editMode = true;
  }

  updateAnnonce(): void {
    if (this.selectedAnnonce) {
      this.annonceService.updateAnnonce(this.selectedAnnonce.id, this.selectedAnnonce).subscribe(updatedAnnonce => {
        this.selectedAnnonce = updatedAnnonce;
        this.editMode = false;
        this.fetchAnnonces();
      });
    }
  }

}
