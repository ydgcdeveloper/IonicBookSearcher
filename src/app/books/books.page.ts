import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({selector: "app-characters", templateUrl: "./books.page.html", styleUrls: ["./books.page.scss"]})
export class BooksPage implements OnInit {
  private books = [];
  private page;
  private author;
  private title;
  private totalItems;
  private API_KEY = "AIzaSyAs3RcZ0bFBpLAhUcSIUFruYTeZMOQ77DU";

  constructor(private activatedRoute : ActivatedRoute, private http : HttpClient) {
    this.page = 0;
  }

  ngOnInit() {
    this.author = this.activatedRoute.snapshot.paramMap.get("author");
    this.title = this.activatedRoute.snapshot.paramMap.get("title");

    if (!this.author || this.author === "none_author") {
      this.author = null;
    }
    if (!this.title || this.title === "none_title") {
      this.title = null;
    }

    var url: string = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
    this.author}+intitle:${
    this.title}&filter=free-ebooks&printType=books&startIndex=${this.page * 10}&key=${
    this.API_KEY}`;

    if (this.author && this.title) {
      url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
      this.author}+intitle:${
      this.title}&filter=free-ebooks&printType=books&startIndex=${this.page * 10}&key=${
      this.API_KEY}`;
    }
    else if (!this.author && this.title) {
      url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${
      this.title}&filter=free-ebooks&printType=books&startIndex=${this.page * 10}&key=${
      this.API_KEY}`;
    }
    else if (!this.title && this.author) {
      url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${
      this.author}&filter=free-ebooks&printType=books&startIndex=${this.page * 10}&key=${
      this.API_KEY}`;
    }

    this.http.get<any>(url).subscribe((res) => {
      this.books = res.items;
      this.totalItems = res.totalItems;
      console.log(`Totalitems: ${this.totalItems}`);
    });
     console.log("URL:  " + url)
  }

  nextPage() {
    if (this.totalItems > 10) {
      if (this.page < Math.ceil(this.totalItems / 10) - 1) {
        this.page++;
      } else {
        this.page = 0;
      }
      this.ngOnInit();
    }
  }

  previousPage() {
    if (this.totalItems > 10) {
      if (this.page >= 1) {
        this.page--;
      } else {
        this.page = Math.ceil(this.totalItems / 10) - 1;
      }
      this.ngOnInit();
    }
  }
}
