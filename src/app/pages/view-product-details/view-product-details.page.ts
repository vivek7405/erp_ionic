import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { Router, ActivatedRoute } from '@angular/router';
import { EditdeletemapComponent } from '../editdeletemap/editdeletemap.component';
import { ProductmappingsComponent } from '../productmappings/productmappings.component';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.page.html',
  styleUrls: ['./view-product-details.page.scss'],
})
export class ViewProductDetailsPage implements OnInit {
  public productDetails: ProductDetail[];
  public columnDefs: any;
  public gridOptions: any;
  public frameworkComponents: any;
  public context: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router, private modalController: ModalController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Material Description', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
      { headerName: 'Output Code', field: 'OutputCode', colId: 'OutputCode' },
      { headerName: 'Output Material Description', field: 'OutputMaterialDesc', colId: 'OutputMaterialDesc' },
      { headerName: 'Project Name', field: 'ProjectName', colId: 'ProjectName' },
      { headerName: 'Split Ratio', field: 'SplitRatio', colId: 'SplitRatio' },
      {
        headerName: 'Create Date', field: 'CreateDate', colId: 'CreateDate', filter: 'agDateColumnFilter',
        filterParams: {
          inRangeInclusive: true,
          // provide comparator function
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            debugger;
            var dateAsString = cellValue;
            if (dateAsString == null) return 0;

            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            var dateParts = dateAsString.split("-");
            var day = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[0]);
            var cellDate = new Date(year, month, day);

            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      },
      {
        headerName: 'Edit Date', field: 'EditDate', colId: 'EditDate', filter: 'agDateColumnFilter',
        filterParams: {
          inRangeInclusive: true,
          // provide comparator function
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            debugger;
            var dateAsString = cellValue;
            if (dateAsString == null) return 0;

            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            var dateParts = dateAsString.split("-");
            var day = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[0]);
            var cellDate = new Date(year, month, day);

            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      },
      { headerName: 'Actions', cellRenderer: 'editdeletemap', pinned: 'right' }
    ];

    this.gridOptions = {
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      },
      pagination: true,
      paginationAutoPageSize: true
    };

    this.frameworkComponents = {
      editdeletemap: EditdeletemapComponent
    };

    this.context = this;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.getAllProductDetails();
    });
    //this.getAllProductDetails();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  public getAllProductDetails() {
    this.generalService.getAllProductDetails()
      .subscribe(
        result => {
          this.productDetails = result;

          this.productDetails.forEach(product => {
            product.CreateDate = product.CreateDate.toString().split('T')[0];
            product.EditDate = product.EditDate.toString().split('T')[0];
          });
        },
        error => {
          alert('Some error occurred!');
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

  editRowAg(rowdata) {
    debugger;
    this.router.navigate(['/product-details'], {
      queryParams: {
        productId: rowdata.ProductId
      }
    });
  }

  deleteRowAg(rowdata) {
    debugger;
    if (confirm('Are you sure you want to Delete?')) {
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = rowdata.ProductId;
      this.generalService.deleteProductByProductId(vendorChallanNoModel)
        .subscribe(
          result => {
            this.generalService.toast(this.toastCtrl, 'Product deleted successfully.');
            this.getAllProductDetails();
          },
          error => {
            if (confirm(error.error.ExceptionMessage)) {
              if (confirm('Are you sure you want to Delete the product and all its references? Once deleted, you will not be able to undo!')) {
                this.generalService.forceDeleteProductByProductId(vendorChallanNoModel)
                  .subscribe(
                    result => {
                      this.generalService.toast(this.toastCtrl, 'Product and all its references deleted successfully.');
                      this.getAllProductDetails();
                    },
                    error => {
                      alert('Something went wrong!');
                    }
                  );
              }
            }
          }
        );
    }
  }

  async mapRowAg(rowdata) {
    debugger;
    const modal = await this.modalController.create({
      component: ProductmappingsComponent,
      componentProps: { productId: rowdata.ProductId }
      //backdropDismiss: false
    });

    modal.onDidDismiss()
      .then(data => {

      });

    await modal.present();
  }

  public export() {
    debugger;

    var params = {
      columnKeys: ['InputCode', 'InputMaterialDesc', 'OutputCode', 'OutputMaterialDesc', 'ProjectName', 'SplitRatio', 'CreateDate', 'EditDate']
    };

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
