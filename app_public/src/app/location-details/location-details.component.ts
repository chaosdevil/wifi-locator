import { Component, OnInit, Input } from '@angular/core';

import { Location, Review } from './../location';
import { Loc8rDataService } from './../loc8r-data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  constructor(
    private loc8rDataService: Loc8rDataService
  ) { }

  @Input() location: Location;

  public googleAPIKey = 'AIzaSyAadWNfqB2YfXGqBD7ap3s-Zyn3fe31Amk';

  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  public formVisible = false;

  public formError: string;

  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }


  public onReviewSubmit(): void {
    this.formError = '';
    if (this.formIsValid()) {
      console.log(this.newReview);
      this.loc8rDataService.addReviewByLocationId(this.location._id, this.newReview)
        .then((review: Review) => {
          console.log('Review saved', review);
          const reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;
          this.resetAndHideReviewForm();
      });
    } else {
      console.log('Not valid');
      this.formError = 'All fields required, please try again';
    }
  }

  private formIsValid(): boolean {
    if (this.newReview.author && this.newReview.rating && this.newReview.reviewText) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

}
