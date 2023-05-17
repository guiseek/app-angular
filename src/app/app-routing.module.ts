import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HomeComponent} from './home/home.component'
import {ProductsComponent} from './products/products.component'
import {ContactComponent} from './contact/contact.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CartComponent } from './cart/cart.component'
import { TableComponent } from './table/table.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'produtos',
    component: ProductsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'contato',
    component: ContactComponent,
  },
  {
    path: 'carrinho',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: TableComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
