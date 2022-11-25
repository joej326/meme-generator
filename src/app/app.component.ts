import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meme-generator';
  form: FormGroup = new FormGroup('');
  pageUrl: string = '';
  imgUrl: string = '';


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.form = new FormGroup({
      topTextField: new FormControl('', [Validators.required]),
      bottomTextField: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const payload = {
      topText: this.form.get('topTextField')?.value,
      bottomText: this.form.get('bottomTextField')?.value
    };
    this.api.postMeme(payload).subscribe({
      next: (data: any) => {
        console.log(data);
        this.pageUrl= data.data.page_url;
        this.imgUrl = data.data.url;
      }
    });
  }

}
