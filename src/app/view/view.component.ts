import { ServicePokeService } from './../service-poke.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

 

  pokemon: any = '';

  subs: Subscription[] = [];

  constructor( private route: ActivatedRoute, private service: ServicePokeService) { }

  set subscription(subscription: Subscription) {
    this.subs.push(subscription);
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {

      if (this.service.pokemons.length) {
        this.pokemon = this.service.pokemons.find(i => i.name === params['name']);
        
        if (this.pokemon) {
          this.getEvolution();
          window. location. reload(); 
          
          return;
        }
      }

      this.subscription = this.service.get(params['name']).subscribe(response => {
        this.pokemon = response;
        this.getEvolution();
         
        console.log(this.pokemon);
      }, error => console.log('Error Occurred:', error));
    });  
  }

  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.subscription = this.service.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.subscription = this.service.getEvolution(id).subscribe(response => this.getEvolves(response.chain));
        
      });
      
      
    }
  }

  getEvolves(chain: any) {
    this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
      
    }
  }

  
  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

}
