import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { Router } from '@angular/router';
import { EditdeletemapComponent } from '../editdeletemap/editdeletemap.component';
import { ProductmappingsComponent } from '../productmappings/productmappings.component';

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

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Input Code', field: 'InputCode' },
      { headerName: 'Input Material Description', field: 'InputMaterialDesc' },
      { headerName: 'Output Code', field: 'OutputCode' },
      { headerName: 'Output Material Description', field: 'OutputMaterialDesc' },
      { headerName: 'Project Name', field: 'ProjectName' },
      { headerName: 'Split Ratio', field: 'SplitRatio' },
      { headerName: 'Create Date', field: 'CreateDate' },
      { headerName: 'Edit Date', field: 'EditDate' },
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

    this.getAllProductDetails();
  }

  public onGridReady(event) {
    debugger;
    // var allColumnIds = [];
    // event.columnApi.getAllColumns().forEach(function (column) {
    //   allColumnIds.push(column.colId);
    // });
    // event.columnApi.autoSizeColumns(allColumnIds);
    // event.columnApi.autoSizeColumns(allColumnIds);
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
}
