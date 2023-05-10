import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface BackendResponse {
  products: Product[];
  total:    number;
  skip:     number;
  limit:    number;
}

export interface Product {
  id:                 number;
  title:              string;
  description:        string;
  price:              number;
  discountPercentage: number;
  rating:             number;
  stock:              number;
  brand:              string;
  category:           string;
  thumbnail:          string;
  images:             string[];
}

@Injectable()
export class ProductsService {

  #products = new BehaviorSubject<Product[]>([])
  products$ = this.#products.asObservable()

  constructor(private http: HttpClient) { }

  load() {
    this.get().subscribe((products) => {
      this.#products.next(products)
    })
  }

  get() {
    return this.http.get<BackendResponse>(
      `https://dummyjson.com/products/`
    ).pipe(
      map(response => response.products)
    )
  }
}
