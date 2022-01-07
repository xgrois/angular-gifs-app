import { Component, OnInit } from '@angular/core';
import { Gif } from '../interfaces/gifs.interfaces';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-results',
  templateUrl: './gifs-results.component.html',
  styleUrls: ['./gifs-results.component.css']
})
export class GifsResultsComponent implements OnInit {

  get results(): Gif[] {
    return this.gifsSerice.results;
  }

  constructor(private gifsSerice: GifsService) { }

  ngOnInit(): void {
  }

}
