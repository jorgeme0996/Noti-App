import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { RespuestaTopHeadlines, Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private notiService: NoticiasService){}

  ngOnInit(){
    this.notiService.getTopHeadlines()
      .subscribe( response => {
        console.log(response);
        this.noticias.push(...response.articles)
      })
  }

}
