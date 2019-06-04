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
  { path: 'part-types', loadChildren: './pages/part-types/part-types.module#PartTypesPageModule' },
  { path: 'product-details', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'challan-details', loadChildren: './pages/challan-details/challan-details.module#ChallanDetailsPageModule' },
  { path: 'view-challan-details', loadChildren: './pages/view-challan-details/view-challan-details.module#ViewChallanDetailsPageModule' },
  { path: 'create-vendor-challan', loadChildren: './pages/create-vendor-challan/create-vendor-challan.module#CreateVendorChallanPageModule' },
  { path: 'view-vendor-challan', loadChildren: './pages/view-vendor-challan/view-vendor-challan.module#ViewVendorChallanPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
