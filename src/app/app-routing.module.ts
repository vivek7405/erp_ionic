import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'purchase-order', loadChildren: './pages/stock-in-flow/purchase-order/purchase-order.module#PurchaseOrderPageModule' },
  { path: 'purchase-details', loadChildren: './pages/stock-in-flow/purchase-details/purchase-details.module#PurchaseDetailsPageModule' },  
  { path: 'part-types', loadChildren: './pages/part-types/part-types.module#PartTypesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
