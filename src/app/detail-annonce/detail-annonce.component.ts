import { Component, OnInit } from '@angular/core';
import { EntitiesAnnonce } from '../../entities/EntitiesAnnonce';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../service/annonce.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-annonce',
  imports: [NgIf],
  templateUrl: './detail-annonce.component.html',
  styleUrl: './detail-annonce.component.css'
})
export class DetailAnnonceComponent implements OnInit{
    annonce: EntitiesAnnonce | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private annonceService: AnnonceService,
    ) {}
  
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!isNaN(id)) {
        this.annonceService.getAnnonceById(id).subscribe(
          data => this.annonce = data,
          error => console.error('Erreur de chargement de l’annonce', error)
        );
      }
    }
  
    goBack(): void {
      this.router.navigate(['/dashboard']);
    }

}
