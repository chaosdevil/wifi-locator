class OpeningTimes {
  days: string;
  opening: string;
  closing: string;
  closed: boolean;
}

export class Review {
  author: string;
  rating: number;
  reviewText: string;
}

export class Location {
  // tslint:disable-next-line: variable-name
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
  openingTimes: OpeningTimes[];
  coords: number[];
  reviews: Review[];
}
