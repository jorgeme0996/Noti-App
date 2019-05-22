import { Component, OnInit } from '@angular/core';
import { DatalocalService } from 'src/app/services/datalocal.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  noticias: Article[] = [];
  constructor(public localStorage: DatalocalService){}

  ngOnInit(){

  }
}
