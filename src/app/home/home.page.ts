import { Component } from '@angular/core';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  author: string = "";
  title: string = "";

  constructor(private router: Router) {
  }  

  search(){
    if(!this.author){
      this.author = 'none_author';
    }
    if(!this.title){
      this.title = 'none_title';
    }
    this.router.navigate([`books/${this.author}/${this.title}`]);  
    this.author = '';
    this.title = '';
  }

}
