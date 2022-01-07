import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '48jvZIUZAT9QHOCFdvEYdPdohOneY9f5';
  private limit: string = '10';
  private offset: string = '0';
  private rating: string = 'g';
  private lang: string = 'es';

  private _historial: string[] = [];

  public results: Gif[] = []; // Use specific type

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 

    // get stored historial, if nothing found (null), return empty array
    this._historial = JSON.parse( localStorage.getItem('historial') || '[]' );
    this.results = JSON.parse( localStorage.getItem('results') || '[]' );

  }

  searchGifs( query: string ) {

    let processedQuery = this.processQuery(query);

    const isPresent: boolean = this._historial.indexOf(processedQuery) !== -1;
    const isFull: boolean = this._historial.length >= 10;

    if (processedQuery !== '' && !isPresent ) {
      if (!isFull) {
        this._historial.unshift(processedQuery);
      } else {
        if (!isPresent) {
          this._historial.pop();
          this._historial.unshift(processedQuery);
        }
      }
      
    }

    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit)
      .set('q',processedQuery)
      .set('offset',this.offset)
      .set('rating',this.rating)
      .set('lang',this.lang);

    this.http.get<SearchGifsResponse>(`${this. url}/search`, { params: params })
      .subscribe( resp => {
        
        this.results = resp.data;

        localStorage.setItem('historial', JSON.stringify(this._historial));
        localStorage.setItem('results', JSON.stringify(this.results));

      });
    


  }

  private processQuery(query: string) {
    // Trim initial, end AND remove extra inter-word spaces
    // '     sahid     mubarak     ' --> 'sahid mubarak'
    return query.replace(/\s+/g, ' ').trim();
  }

}
