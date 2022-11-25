import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

import { Meme } from './models/meme.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meme-generator';
  fetchedMemes: Meme[] = [];
  randomlySelectedMeme!: Meme;
  form: FormGroup = new FormGroup('');
  pageUrl: string = '';
  imgUrl: string = '';
  boxCount: number = 0;
  /**
   * Simply for taking the box_count property from the API and making an array from that number.
   */
  boxIterator: number[] = [];
  memeId: string = '';


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getMemes().subscribe({
      next: (data: any) => {
        this.fetchedMemes = data.data.memes;
        this.randomlySelectedMeme = this.fetchedMemes[Math.floor(Math.random() * this.fetchedMemes.length)];
        this.boxCount = this.randomlySelectedMeme.box_count;
        this.memeId = this.randomlySelectedMeme.id;


        this.form = new FormGroup({});

        this.boxIterator = Array(this.boxCount).fill('');

        this.boxIterator.map((val, i) => {
          const formControl =  new FormControl('', [Validators.required]);
          this.form.addControl(`textField${i + 1}`, formControl);
        });
      }
    });


    
  }

  onSubmit() {
    const boxes = [];
    for (const key in this.form.value) {
      boxes.push({text: this.form.value[key].toUpperCase()});
    }
    const payload = {
      boxes,
      memeId: this.memeId
    };
    this.api.postMeme(payload).subscribe({
      next: (data: any) => {
        this.pageUrl= data.data.page_url;
        this.imgUrl = data.data.url;
      }
    });
  }

}
