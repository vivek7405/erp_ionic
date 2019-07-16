import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  public productDetails: ProductDetail[];
  public columnDefs: any;

  public gridOptions: any;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Input Code', field: 'InputCode', sortable: true, filter: true },
      { headerName: 'Input Material Description', field: 'InputMaterialDesc', sortable: true, filter: true },
      { headerName: 'Output Code', field: 'OutputCode', sortable: true, filter: true },
      { headerName: 'Output Material Description', field: 'OutputMaterialDesc', sortable: true, filter: true },
      { headerName: 'Project Name', field: 'ProjectName', sortable: true, filter: true },
      { headerName: 'Split Ratio', field: 'SplitRatio', sortable: true, filter: true }
    ];

    this.gridOptions = {
      defaultColDef: {
        sortable: true,
        filter: true
      },
      pagination: true,
      paginationAutoPageSize: true
    };

    this.getAllProductDetails();
  }

  public getAllProductDetails() {
    let selfObj = this;
    this.generalService.getAllProductDetails()
      .subscribe(
        result => {
          selfObj.productDetails = result;
        },
        error => {
          alert(error);
        }
      );
  }

  // public redirectToProductMappings(productDetail: ProductDetail) {
  //   this.router.navigate(['/product-mappings'], {
  //     queryParams: {
  //       productId: productDetail.ProductId
  //     }
  //   });
  // }

  public redirectToProductMappings(event: any) {
    debugger;
    this.router.navigate(['/product-mappings'], {
      queryParams: {
        productId: event.data.ProductId
      }
    });
  }
}
