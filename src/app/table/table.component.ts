import {AfterViewInit, Component, Input, ViewChild} from '@angular/core'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort, SortDirection} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'
import {TableDataSource} from './table-datasource'
import {Product, ProductsService} from '../products/products.service'
import {HttpClient} from '@angular/common/http'
import {
  merge,
  startWith,
  switchMap,
  catchError,
  of as observableOf,
  map,
} from 'rxjs'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable) table!: MatTable<Product>

  displayedColumns: string[] = ['created', 'state', 'number', 'title']
  exampleDatabase!: ExampleHttpDatabase | null
  data: GithubIssue[] = []

  resultsLength = 0
  isLoadingResults = true
  isRateLimitReached = false

  constructor(
    private _httpClient: HttpClient,
    readonly productService: ProductsService
  ) {}

  ngAfterViewInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient)

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)))
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false
          this.isRateLimitReached = data === null

          if (data === null) {
            return []
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count
          return data.items
        })
      )
      .subscribe((data) => (this.data = data))
  }
}

export interface GithubApi {
  items: GithubIssue[]
  total_count: number
}

export interface GithubIssue {
  created_at: string
  number: string
  state: string
  title: string
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number) {
    const href = 'https://api.github.com/search/issues'
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`

    return this._httpClient.get<GithubApi>(requestUrl)
  }
}
