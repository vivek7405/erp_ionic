import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { Router } from '@angular/router';
import { EditdeleteComponent } from '../editdelete/editdelete.component';

@Component({
  selector: 'app-view-vendor-challan',
  templateUrl: './view-vendor-challan.page.html',
  styleUrls: ['./view-vendor-challan.page.scss'],
})
export class ViewVendorChallanPage implements OnInit {
  public vendorChallans: VendorChallanModel[];
  public IsNg: boolean = false;
  public columnDefs: any;
  public gridOptions: any;
  public frameworkComponents: any;
  public context: any;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Vibrant Challan No', field: 'VendorChallanNo' },
      { headerName: 'Vibrant Challan Date', field: 'VendorChallanDate' },
      { headerName: 'Total Stock Out', field: 'outputQuantity' },
      { headerName: 'Create Date', field: 'CreateDate' },
      { headerName: 'Edit Date', field: 'EditDate' },
      { headerName: 'Actions', cellRenderer: 'editdelete' }

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
      editdelete: EditdeleteComponent
    };

    this.context = this;

    this.getAllVendorChallans();
  }

  public getAllVendorChallans() {
    this.generalService.getAllVendorChallans()
      .subscribe(
        result => {
          this.vendorChallans = result;

          this.vendorChallans.forEach(vendorChallan => {
            vendorChallan.outputQuantity = 0;
            vendorChallan.VendorChallanDate = vendorChallan.VendorChallanDate.toString().split('T')[0];
            vendorChallan.CreateDate = vendorChallan.CreateDate.toString().split('T')[0];
            vendorChallan.EditDate = vendorChallan.EditDate.toString().split('T')[0];
            vendorChallan.OutStocks.forEach(outStock => {
              vendorChallan.outputQuantity += outStock.OutputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public getAllNgVendorChallans() {
    this.generalService.getAllNgVendorChallans()
      .subscribe(
        result => {
          this.vendorChallans = result;

          this.vendorChallans.forEach(vendorChallan => {
            vendorChallan.outputQuantity = 0;
            vendorChallan.VendorChallanDate = vendorChallan.VendorChallanDate.toString().split('T')[0];
            vendorChallan.OutStocks.forEach(outStock => {
              vendorChallan.outputQuantity += outStock.OutputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public ngChallansChange() {
    if (this.IsNg) {
      this.getAllNgVendorChallans();
    } else {
      this.getAllVendorChallans();
    }
  }

  // public showDetails(vendorChallan: VendorChallanModel) {
  //   this.router.navigate(['/vendor-challan-info'], {
  //     queryParams: {
  //       vendorChallanNo: vendorChallan.VendorChallanNo
  //     }
  //   });
  // }

  public showDetails(event) {
    this.router.navigate(['/vendor-challan-info'], {
      queryParams: {
        vendorChallanNo: event.data.VendorChallanNo
      }
    });
  }

  public editRowAg(rowdata) {
    debugger;
    this.router.navigate(['/create-vendor-challan'], {
      queryParams: {
        challanId: rowdata.VendorChallanNo
      }
    });
  }

  public deleteRowAg(rowdata) {
    debugger;
  }
}
