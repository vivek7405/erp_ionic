import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { DeleteComponent } from '../delete/delete.component';

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

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Vibrant Challan No', field: 'VendorChallanNo', colId: 'VendorChallanNo' },
      {
        headerName: 'Vibrant Challan Date', field: 'VendorChallanDate', colId: 'VendorChallanDate', filter: 'agDateColumnFilter',
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
      { headerName: 'Total Stock Out', field: 'outputQuantity', colId: 'outputQuantity' },
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
      { headerName: 'Actions', cellRenderer: 'delete' }
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
      delete: DeleteComponent
    };

    this.context = this;

    this.activatedRoute.queryParams.subscribe(params => {
      this.getAllVendorChallans();
    });
    //this.getAllVendorChallans();
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
        vendorChallanNo: event.data.VendorChallanNo,
        vendorChallanDate: event.data.VendorChallanDate,
        totalOutStock: event.data.outputQuantity
      }
    });
  }

  public editRowAg(rowdata) {
    debugger;
    this.router.navigate(['/create-vendor-challan'], {
      queryParams: {
        vendorChallanNo: rowdata.VendorChallanNo
      }
    });
  }

  public deleteRowAg(rowdata) {
    debugger;
    if (confirm('Are you sure you wnat to Delete?')) {
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = rowdata.VendorChallanNo;

      this.generalService.deleteVendorChallanByVendorChallanNo(vendorChallanNoModel)
        .subscribe(
          result => {
            this.generalService.toast(this.toastCtrl, 'Vendor Challan deleted successfully.');
            this.getAllVendorChallans();
          },
          error => {
            alert('Something went wrong!');
          }
        );
    }
  }

  public export() {
    var params = {
      columnKeys: ['VendorChallanNo', 'VendorChallanDate', 'outputQuantity', 'CreateDate', 'EditDate']
    };

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
