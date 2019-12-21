import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewPODetailModel } from 'src/app/models/ViewPODetailModel';
import { EditdeleteComponent } from '../editdelete/editdelete.component';
import { Location } from '@angular/common';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-challan-details',
  templateUrl: './view-challan-details.page.html',
  styleUrls: ['./view-challan-details.page.scss'],
})
export class ViewChallanDetailsPage implements OnInit {
  public challanDetails: ViewChallanDetailModel[];
  public poDetails: ViewPODetailModel[];
  public productQnts: ProductQuantity[];

  public isPO: boolean = false;

  public columnDefsChallan: any;
  public columnDefsPO: any;

  public gridOptions: any;
  public frameworkComponents: any;
  public context: any;

  constructor(public generalService: GeneralService, public router: Router, public activatedRoute: ActivatedRoute, public location: Location, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.columnDefsChallan = [
      { headerName: 'Challan No', field: 'ChallanDetail.ChallanNo', colId: 'ChallanNo' },
      {
        headerName: 'Challan Date', field: 'ChallanDetail.ChallanDate', colId: 'ChallanDate', filter: 'agDateColumnFilter',
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
      { headerName: 'Total Stock In', field: 'totalStockIn', colId: 'ChallanStockIn' },
      {
        headerName: 'Create Date', field: 'ChallanDetail.CreateDate', colId: 'ChallanCreateDate', filter: 'agDateColumnFilter',
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
        headerName: 'Edit Date', field: 'ChallanDetail.EditDate', colId: 'ChallanEditDate', filter: 'agDateColumnFilter',
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
      { headerName: 'Actions', cellRenderer: 'editdelete' }
    ];

    this.columnDefsPO = [
      { headerName: 'PO No', field: 'PODetail.PONo', colId: 'PONo' },
      {
        headerName: 'PO Date', field: 'PODetail.PODate', colId: 'PODate', filter: 'agDateColumnFilter',
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
      { headerName: 'Total Stock Out', field: 'totalStockIn', colId: 'POStockOut' },
      {
        headerName: 'Create Date', field: 'PODetail.CreateDate', colId: 'POCreateDate', filter: 'agDateColumnFilter',
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
        headerName: 'Edit Date', field: 'PODetail.EditDate', colId: 'POEditDate', filter: 'agDateColumnFilter',
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

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.isPO)
        this.getAllPODetails();
      else
        this.getAllChallanDetails();
    });
    //this.getAllChallanDetails();
  }

  public poToggle() {
    if (this.isPO) {
      this.getAllPODetails();
    } else {
      this.getAllChallanDetails();
    }
  }

  public getAllChallanDetails() {
    this.generalService.getAllChallanDetails()
      .subscribe(
        result => {
          debugger;
          this.challanDetails = result;

          this.challanDetails.forEach(challanDetail => {
            challanDetail.totalStockIn = 0;
            challanDetail.ChallanDetail.ChallanDate = challanDetail.ChallanDetail.ChallanDate.toString().split('T')[0];
            challanDetail.ChallanDetail.CreateDate = challanDetail.ChallanDetail.CreateDate.toString().split('T')[0];
            challanDetail.ChallanDetail.EditDate = challanDetail.ChallanDetail.EditDate.toString().split('T')[0];
            challanDetail.ChallanProducts.forEach(challanProduct => {
              challanDetail.totalStockIn += challanProduct.ChallanProduct.InputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public getAllPODetails() {
    this.generalService.getAllPODetails()
      .subscribe(
        result => {
          debugger;
          this.poDetails = result;

          this.poDetails.forEach(poDetail => {
            poDetail.totalStockIn = 0;
            poDetail.PODetail.PODate = poDetail.PODetail.PODate.toString().split('T')[0];
            poDetail.PODetail.CreateDate = poDetail.PODetail.CreateDate.toString().split('T')[0];
            poDetail.PODetail.EditDate = poDetail.PODetail.EditDate.toString().split('T')[0];
            poDetail.POProducts.forEach(poProduct => {
              poDetail.totalStockIn += poProduct.POProduct.InputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  // public showDetails(challanDetail: ViewChallanDetailModel) {
  //   this.router.navigate(['/view-challan-detail-info'], {
  //     queryParams: {
  //       challanId: challanDetail.ChallanDetail.ChallanId
  //     }
  //   });
  // }

  // public showPODetails(poDetail) {
  //   this.router.navigate(['/view-challan-detail-info'], {
  //     queryParams: {
  //       poId: poDetail.PODetail.POId
  //     }
  //   });
  // }

  public showDetails(event) {
    debugger;
    this.router.navigate(['/view-challan-detail-info'], {
      queryParams: {
        challanId: event.data.ChallanDetail.ChallanId
      }
    });
  }

  public showPODetails(event) {
    this.router.navigate(['/view-challan-detail-info'], {
      queryParams: {
        poId: event.data.PODetail.POId
      }
    });
  }

  public editRowAg(rowdata) {
    debugger;
    let id = 0;
    if (this.isPO)
      id = rowdata.PODetail.POId;
    else
      id = rowdata.ChallanDetail.ChallanId;

    this.router.navigate(['/challan-details'], {
      queryParams: {
        challanId: id,
        isPO: this.isPO
      }
    });
  }

  public deleteRowAg(rowdata) {
    debugger;
    if (confirm('Are you sure you want to Delete?')) {
      debugger;
      let vendorChallanNoModel = new VendorChallanNoModel();
      if (this.isPO)
        vendorChallanNoModel.VendorChallanNo = rowdata.PODetail.POId;
      else
        vendorChallanNoModel.VendorChallanNo = rowdata.ChallanDetail.ChallanId;

      if (this.isPO) {
        this.generalService.deleteBASFPOByPOId(vendorChallanNoModel)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, 'BASF PO deleted successfully.');
              this.getAllPODetails();
            },
            error => {
              if (confirm(error.error.ExceptionMessage)) {
                if (confirm('Are you sure you want to Delete the PO and all its references? Once deleted, you will not be able to undo!')) {
                  this.generalService.forceDeleteBASFPOByPOId(vendorChallanNoModel)
                    .subscribe(
                      result => {
                        this.generalService.toast(this.toastCtrl, 'BASF PO and all its references deleted successfully.');
                        this.getAllPODetails();
                      },
                      error => {
                        alert('Something went wrong!');
                      }
                    );
                }
              }
            }
          );
      } else {
        this.generalService.deleteBASFChallanByChallanId(vendorChallanNoModel)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, 'BASF Challan deleted successfully.');
              this.getAllChallanDetails();
            },
            error => {
              if (confirm(error.error.ExceptionMessage)) {
                if (confirm('Are you sure you want to Delete the Challan and all its references? Once deleted, you will not be able to undo!')) {
                  this.generalService.forceDeleteBASFChallanByChallanId(vendorChallanNoModel)
                    .subscribe(
                      result => {
                        this.generalService.toast(this.toastCtrl, 'BASF Challan and all its references deleted successfully.');
                        this.getAllChallanDetails();
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
  }

  public reportRowAg(rowdata) {
    debugger;
    let id = 0;
    if (this.isPO)
      id = rowdata.PODetail.POId;
    else
      id = rowdata.ChallanDetail.ChallanId;

    this.router.navigate(['/basf-challan-po-where-used-report'], {
      queryParams: {
        challanId: id,
        isPO: this.isPO
      }
    });
  }

  public export() {
    var params = {
      columnKeys: ['ChallanNo', 'ChallanDate', 'ChallanStockIn', 'ChallanCreateDate', 'ChallanEditDate']
    };

    if (this.isPO) {
      params = {
        columnKeys: ['PONo', 'PODate', 'POStockIn', 'POCreateDate', 'POEditDate']
      };
    }

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
