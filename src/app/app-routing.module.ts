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
  { path: 'view-challan-detail-info', loadChildren: './pages/view-challan-detail-info/view-challan-detail-info.module#ViewChallanDetailInfoPageModule' },
  { path: 'view-product-details', loadChildren: './pages/view-product-details/view-product-details.module#ViewProductDetailsPageModule' },
  { path: 'product-mappings', loadChildren: './pages/product-mappings/product-mappings.module#ProductMappingsPageModule' },
  { path: 'create-basf-invoice', loadChildren: './pages/create-basf-invoice/create-basf-invoice.module#CreateBasfInvoicePageModule' },
  { path: 'view-basf-invoice', loadChildren: './pages/view-basf-invoice/view-basf-invoice.module#ViewBasfInvoicePageModule' },
  { path: 'basf-invoice-info', loadChildren: './pages/basf-invoice-info/basf-invoice-info.module#BasfInvoiceInfoPageModule' },
  { path: 'basf-challan-po-where-used-report', loadChildren: './pages/basf-challan-po-where-used-report/basf-challan-po-where-used-report.module#BasfChallanPoWhereUsedReportPageModule' },
  { path: 'close-challan-report', loadChildren: './pages/close-challan-report/close-challan-report.module#CloseChallanReportPageModule' },
  { path: 'fg-stock-report', loadChildren: './pages/fg-stock-report/fg-stock-report.module#FgStockReportPageModule' },
  { path: 'semi-stock-report', loadChildren: './pages/semi-stock-report/semi-stock-report.module#SemiStockReportPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
