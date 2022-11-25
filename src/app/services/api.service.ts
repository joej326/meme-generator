import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


// @ts-ignore
import { credentials } from '../../../.config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getMemes() {
    return this.http.get('https://api.imgflip.com/get_memes');
  }

  postMeme(payload: any) {
    const formData = new FormData();
    // formData.append('text0', payload.topText);
    // formData.append('text1', payload.bottomText);
    formData.append('template_id', payload.memeId);
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    // "boxes[0][text]": "top",
    payload.boxes.map((val: any, i: number) => {
      formData.append(`boxes[${i}][text]`, val.text);
    });
    // formData.append('boxes', JSON.stringify(payload.boxes));

    return this.http.post(`https://api.imgflip.com/caption_image`, 
      formData
    );
  }

}
