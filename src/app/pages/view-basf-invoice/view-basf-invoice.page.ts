import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BASFInvoiceModel } from 'src/app/models/BASFInvoiceModel';
import { DeleteComponent } from '../delete/delete.component';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';

@Component({
  selector: 'app-view-basf-invoice',
  templateUrl: './view-basf-invoice.page.html',
  styleUrls: ['./view-basf-invoice.page.scss'],
})
export class ViewBasfInvoicePage implements OnInit {
  public basfInvoices: BASFInvoiceModel[];
  public IsNg: boolean = false;
  public columnDefs: any;
  public gridOptions: any;
  public frameworkComponents: any;
  public context: any;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'BASF Invoice Id', field: 'BASFInvoiceId', colId: 'BASFInvoiceId', hide: true },
      { headerName: 'BASF Invoice No', field: 'BASFInvoiceNo', colId: 'BASFInvoiceNo' },
      {
        headerName: 'BASF Invoice Date', field: 'BASFInvoiceDate', colId: 'BASFInvoiceDate', filter: 'agDateColumnFilter',
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
      this.getAllBASFInvoices();
    });
    //this.getAllBASFInvoices();
  }

  public getAllBASFInvoices() {
    this.generalService.getAllBASFInvoices()
      .subscribe(
        result => {
          this.basfInvoices = result;

          this.basfInvoices.forEach(basfInvoice => {
            basfInvoice.outputQuantity = 0;
            basfInvoice.BASFInvoiceDate = basfInvoice.BASFInvoiceDate.toString().split('T')[0];
            basfInvoice.CreateDate = basfInvoice.CreateDate.toString().split('T')[0];
            basfInvoice.EditDate = basfInvoice.EditDate.toString().split('T')[0];
            basfInvoice.InvoiceOutStocks.forEach(outStock => {
              basfInvoice.outputQuantity += outStock.OutputQuantity;
            });
          });
        },
        error => {
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public showDetails(event) {
    this.router.navigate(['/basf-invoice-info'], {
      queryParams: {
        basfInvoiceId: event.data.BASFInvoiceId,
        basfInvoiceNo: event.data.BASFInvoiceNo,
        basfInvoiceDate: event.data.BASFInvoiceDate,
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
      vendorChallanNoModel.VendorChallanNo = rowdata.BASFInvoiceId;

      this.generalService.deleteBASFInvoiceByBASFInvoiceId(vendorChallanNoModel)
        .subscribe(
          result => {
            this.generalService.toast(this.toastCtrl, 'BASF Invoice deleted successfully.');
            this.getAllBASFInvoices();
          },
          error => {
            alert('Something went wrong!');
          }
        );
    }
  }

  public export() {
    var params = {
      columnKeys: ['BASFInvoiceNo', 'BASFInvoiceDate', 'outputQuantity', 'CreateDate', 'EditDate']
    };

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
