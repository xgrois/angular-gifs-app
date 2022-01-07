import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-search',
  templateUrl: './gifs-search.component.html',
  styleUrls: ['./gifs-search.component.css']
})
export class GifsSearchComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  onSearch() {
    const searchTerm = this.txtSearch.nativeElement.value;
    console.log(searchTerm);

    this.gifsService.searchGifs(searchTerm);

    this.txtSearch.nativeElement.value = '';
  }

}
