import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  generations = [
    {gen: 'Generation I', limit: '151', start: '0'},
    {gen: 'Generation II', limit: '100', start: '151'},
    {gen: 'Generation III', limit: '135', start: '251'},
    {gen: 'Generation IV', limit: '107', start: '386'},
    {gen: 'Generation V', limit: '156', start: '493'},
    {gen: 'Generation VI', limit: '72', start: '649'},
    {gen: 'Generation VII', limit: '88', start: '721'},
    {gen: 'Generation VIII', limit: '89', start: '809'},

  ]

  constructor(
    private http: HttpClient
  ) { }

    getPokemonGeneration(start, limit) {
      let url = `${environment.url_pokemon_details}/?limit=${limit}&offset=${start}`
      return this.http.get(url)
    }

    getAllPokemon(url: string) {
      return this.http.get(url) 
    }

    getPokemonDetails(id: string) {
      return this.http.get(`${environment.url_pokemon_details}/${id}`)
    }

    getPokemonSpecies (id: string) {
      return this.http.get(`${environment.url_pokemon_details}-species/${id}`)
    }
}
