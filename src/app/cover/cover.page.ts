import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({selector: "app-cover", templateUrl: "./cover.page.html", styleUrls: ["./cover.page.scss"]})
export class CoverPage implements OnInit {

  bookId: String;
  book;

  constructor(private activatedRoute : ActivatedRoute, private http : HttpClient) {}

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get<any>(`https://www.googleapis.com/books/v1/volumes/${this.bookId}`).subscribe((res) => {
      this.book = res;
    });
  }
}
