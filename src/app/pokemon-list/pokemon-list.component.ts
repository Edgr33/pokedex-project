import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { PokemonService } from '../core/pokemon.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnChanges {

  @ViewChild('paginator') paginator: MatPaginator

  filterInput: string

  filteredList: any[] = []
  pokemonGet:any[] = []
  pokemonList:any[] = []

  genOptions = this.pokemonService.generations
  generationUrl = this.pokemonService.generations[0]

  page_size:number = 20
  page_number: number = 0
  pageSizeOptions = [5, 10, 20, 50, 100]
  loadingIcon: boolean = false


  test = [5, 10, 20, 50, 151, 5, 10, 20, 50, 151,5, 10, 20, 50, 151,5, 10, 20, 50, 151,5, 10, 20, 50, 151,5, 10, 20, 50, 151,5, 10, 20, 50, 151,]

  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('gen')){
      let session = JSON.parse(sessionStorage.getItem('gen'))
      console.log(JSON.parse(sessionStorage.getItem('gen')))

      this.generationUrl = this.pokemonService.generations.find(el => el.gen === session.gen)
    }

    this.fetchPokemonList(this.generationUrl)  

    // console.log(this.loadingIcon)
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.filteredInput
  }

  fetchPokemonList({start, limit}: any) {
    this.pokemonService.getPokemonGeneration(start, limit)
    .subscribe((data:any) => {

      // const {info, results} = data
      // this.pokemonGet = [...this.pokemonGet, ...results]
      this.pokemonGet = [...data.results]
    
      // console.log(this.pokemonGet)

      this.fetchPokemonData()
      this.loading()
    });
  }

  getPokemonData(str) {
    return this.http.get(str)
  }

  fetchPokemonData() {
    let arrData = []

    this.pokemonGet.forEach(element => {
      this.getPokemonData(element.url)
      .subscribe(data => {
        arrData.push(data)

        
        // this.pokemonList
        if (arrData.length === this.pokemonGet.length){
          this.pokemonList = arrData
          this.filterInput = null
          this.filteredList = []
          this.pokemonList.sort((a, b) => {
            return a.id - b.id
          })
        }

      })
    });
  }

  loading() {
    let limit = parseInt(this.generationUrl.limit)
    this.loadingIcon = true

    let interval = setInterval(() => {
      if(this.pokemonList.length != limit)
        this.loadingIcon = true
        else {
        this.loadingIcon = false
        clearInterval(interval)
      }
    }, 300)
  }

  handlePage(e: PageEvent) {
    //  console.log(e)
    //  console.log('t1: ', this.page_size);
    //  console.log('t2: ', this.page_number);
     
    this.page_size = e.pageSize
    this.page_number = e.pageIndex
    // console.log('r1: ', this.page_size);
    // console.log('r2: ', this.page_number);

  }

  changeGen() {
    this.fetchPokemonList(this.generationUrl)  
    sessionStorage.setItem('gen', JSON.stringify(this.generationUrl))

    this.paginator.firstPage()
    // console.log(this.generationUrl)
    this.loading()

  }

  filter() {
    this.filteredList = this.pokemonList.filter(element => {
      return element.name.includes(this.filterInput)
    })
    // console.log(this.filteredList)
  }
}

