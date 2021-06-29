import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from 'src/app/core/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  pokemonDetails:any = null 
  pokemonSpecies:any = null
  previousSprite: any
  nextSprite: any

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id
      // console.log(id)

      this.fetchPokemonDetails(id)
      this.fetchPokemonSpecies(id)

      this.fetchPrevious(id)
      this.fetchNext(id)
    })
  }

  
  fetchPokemonDetails(id: string) {
    this.pokemonService.getPokemonDetails(id)
    .subscribe(data => {
      this.pokemonDetails = data
      // console.log('details: ', this.pokemonDetails)
    })
  }

  fetchPokemonSpecies(id: string) {
    this.pokemonService.getPokemonSpecies(id)
    .subscribe(data => {
      this.pokemonSpecies = data
      // console.log('species: ',this.pokemonSpecies)
    })
  }

  fetchPrevious(id: string) {
    let prevId = parseInt(id) - 1

    if(prevId != 0) {
      this.pokemonService.getPokemonDetails(prevId.toString())
      .subscribe((data: any) => {
        this.previousSprite = data.sprites.front_default
      })
    } else this.previousSprite = null
  }

  fetchNext(id: string) {
    let nextId = parseInt(id) + 1

    if(nextId < 899) {


      this.pokemonService.getPokemonDetails(nextId.toString())
      .subscribe((data: any) => {
        this.nextSprite = data.sprites.front_default      
        // console.log(this.nextSprite)
      })
    } else this.previousSprite = null
  }

}
