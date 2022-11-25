import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @ts-ignore
import { mostPopularTemplateIds } from '../data/top-100-ids';
// @ts-ignore
import { credentials } from '../../../.config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postMeme(payload: any) {
    const formData = new FormData();
    formData.append('text0', payload.topText);
    formData.append('text1', payload.bottomText);
    formData.append('template_id', mostPopularTemplateIds[Math.floor(Math.random() * mostPopularTemplateIds.length)].toString());
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    return this.http.post(`https://api.imgflip.com/caption_image`, 
      formData
    );
  }

}
