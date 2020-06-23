import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  public pageContent = {
    header: {
      title: 'About Loc8r',
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit down \
      and get a bit of work done. \n\nSuspendisse quis bibendum erat, at dictum urna. \
      Quisque et quam hendrerit, blandit mauris eget, finibus mi. Integer quis risus varius \
      ante dignissim eleifend. Pellentesque leo erat, vulputate non imperdiet eget, volutpat in turpis. \
      Nunc commodo elit vel scelerisque aliquam. Nulla facilisi. Integer non finibus purus, \
      vitae venenatis libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. \
      Phasellus odio justo, dictum sed sagittis eu, pellentesque at ligula. Pellentesque in fermentum magna, \
      at sodales dui. Donec quis suscipit eros, sit amet fringilla enim. Vestibulum rutrum turpis erat, \
      vel ultrices neque molestie sit amet.'
  };

  ngOnInit(): void {
  }

}
