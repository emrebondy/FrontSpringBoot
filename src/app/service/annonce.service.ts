import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { EntitiesAnnonce } from '../../entities/EntitiesAnnonce';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = 'http://localhost:8080/annonces';

  getRole(): HttpHeaders {
    const role = sessionStorage.getItem('role');
    
    let headers = new HttpHeaders();
    
    if (role === 'admin') {
      headers = headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
    } else if (role === 'user') {
      headers = headers.append('Authorization', 'Basic ' + btoa('user:user'));
    } else {
      console.log("Utilisateur non authentifié");
      return new HttpHeaders();
    }
    
    return headers;
  }
  

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAnnonces(): Observable<EntitiesAnnonce[]> {
    let headers = this.getRole()
    return this.http.get<EntitiesAnnonce[]>(this.apiUrl, { headers });
  }

  deleteAnnonce(id: number): Observable<void> {
    let headers = this.getRole()
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  updateAnnonce(id: number, annonce: EntitiesAnnonce): Observable<EntitiesAnnonce> {
    let headers = this.getRole()
    return this.http.put<EntitiesAnnonce>(`${this.apiUrl}/${id}`, annonce, { headers });
  }

  getAnnonceById(id: number):Observable<EntitiesAnnonce>{
    let headers = this.getRole()
    return this.http.get<EntitiesAnnonce>(`${this.apiUrl}/${id}`, { headers });
  }

  
}