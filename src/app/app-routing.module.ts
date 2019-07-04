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
  { path: 'product-details', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'challan-details', loadChildren: './pages/challan-details/challan-details.module#ChallanDetailsPageModule' },
  { path: 'view-challan-details', loadChildren: './pages/view-challan-details/view-challan-details.module#ViewChallanDetailsPageModule' },
  { path: 'create-vendor-challan', loadChildren: './pages/create-vendor-challan/create-vendor-challan.module#CreateVendorChallanPageModule' },
  { path: 'view-vendor-challan', loadChildren: './pages/view-vendor-challan/view-vendor-challan.module#ViewVendorChallanPageModule' },
  { path: 'vendor-challan-info', loadChildren: './pages/vendor-challan-info/vendor-challan-info.module#VendorChallanInfoPageModule' },
  { path: 'view-challan-detail-info', loadChildren: './pages/view-challan-detail-info/view-challan-detail-info.module#ViewChallanDetailInfoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
