import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicePokeService {

 
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private poke: any[] = [];
  

  constructor(private http: HttpClient) {
  }

  get pokemons(): any[] {
    return this.poke;
  }
  
 
  getPoke(): Observable<any> {
    
    return this.http.get<any>(`${this.url}?limit=1154` );
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    
    return this.http.get<any>(`${this.url}${name}`);
  }


  getEvolution(id: number): Observable<any> {
    
    return this.http.get<any>(`${'https://pokeapi.co/api/v2/'}evolution-chain/${id}`);
  }

  getSpecies(name: string): Observable<any> {
    
    return this.http.get<any>(`${'https://pokeapi.co/api/v2/'}pokemon-species/${name}`);
  }
}
