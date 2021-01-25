import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public year: any;

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}


