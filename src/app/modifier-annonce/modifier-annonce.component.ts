import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../service/annonce.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-modifier-annonce',
  imports: [NgIf,ReactiveFormsModule,CommonModule],
  templateUrl: './modifier-annonce.component.html',
  styleUrl: './modifier-annonce.component.css'
})
export class ModifierAnnonceComponent implements OnInit{
  annonceForm: FormGroup;
  annonceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private annonceService: AnnonceService
  ) {
    this.annonceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      adress: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]]
    });
    this.annonceId = 0;
  }

  ngOnInit(): void {
    this.annonceId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(this.annonceId)) {
      this.annonceService.getAnnonceById(this.annonceId).subscribe({
        next: data => this.annonceForm.patchValue(data),
        error: error => console.error('Erreur de chargement de l’annonce', error)
      });
    }
  }

  onSubmit(): void {
    if (this.annonceForm.valid) {
      const annonceData = {
        ...this.annonceForm.value
      };

      this.annonceService.updateAnnonce(this.annonceId, annonceData).subscribe({
        next: () => {
          console.log('Annonce mise à jour avec succès');
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('Erreur lors de la modification', error);
          alert('Une erreur est survenue lors de la mise à jour de l’annonce.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}

