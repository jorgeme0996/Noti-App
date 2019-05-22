import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey,
      apiUrl = environment.apiUrl,
      headers = new HttpHeaders({
        'X-Api-key': apiKey
      });

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPageNumber = 0;

  constructor(private http:HttpClient) { }

  private ejecutaQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers})
  }

  getTopHeadlines(){
    this.headlinesPageNumber ++;
    return this.ejecutaQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPageNumber}`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=358d687e5f9d4b2698c64d1a67580b8b`);
  }

  getTopHeadlinesCategory(categoria:string){
    return this.ejecutaQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`)
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=de&category=${categoria}&apiKey=358d687e5f9d4b2698c64d1a67580b8b`);
  }
}
