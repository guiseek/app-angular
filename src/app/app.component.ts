import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  mobileQuery: MediaQueryList;

  navigation = [
    {
      label: 'Página inicial',
      path: '/'
    },
    {
      path: '/dashboard',
      label: 'Dashboard'
    },
    {
      label: 'Produtos',
      path: '/produtos'
    },{
      label: 'Contato',
      path: '/contato'
    },
    {
      label: 'Carrinho',
      path: '/carrinho'
    },
    {
      label: 'Checkout',
      path: '/checkout'
    }
  ]

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
