import { ServicePokeService } from './../service-poke.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  
  page: number = 1;
  filter: any = { name: '' };
  show = true;
  searchTextEntered: string = '';


  
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
 
  
  
  subscriptions: Subscription[] = [];

  constructor( private Service: ServicePokeService) { }

 

  get pokemons(): any[] {
    return this.Service.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    
      this.loadMore();
     
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  loadMore(): void {
    
    this.subscription = this.Service.getPoke().subscribe(response => {
      const details = response.results.map((i: any) => this.Service.get(i.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.Service.pokemons.push(response);
        
      });
    }, error => console.log('Error Occurred:', error), () => 'Error');
  }

 onChange(){
  
  const value = this.filter.value;
  
  if(value === ''){
    this.show = true;
  }else{
    this.show = false;
  }

  
 }

 onSearchEntered( newItem: string){

  this.filter = newItem;
  
  console.log(this.filter);

 }
  

}
