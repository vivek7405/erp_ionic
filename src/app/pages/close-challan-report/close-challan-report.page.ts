import { Component, OnInit } from '@angular/core';
import { CloseChallanReportModel } from 'src/app/models/CloseChallanReportModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-close-challan-report',
  templateUrl: './close-challan-report.page.html',
  styleUrls: ['./close-challan-report.page.scss'],
})
export class CloseChallanReportPage implements OnInit {
  public closeChallanReportModelList: CloseChallanReportModel[];
  public gridOptions: any;
  public columnDefs: any;
  public context: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(public generalService: GeneralService, public router: Router) { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'BASF Challan Id', field: 'ChallanId', colId: 'ChallanId', hide: true },
      { headerName: 'BASF Challan No', field: 'ChallanNo', colId: 'ChallanNo' },
      {
        headerName: 'BASF Challan Date', field: 'ChallanDate', colId: 'ChallanDate', filter: 'agDateColumnFilter',
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
            var year = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var day = Number(dateParts[0]);
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
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
      { headerName: 'Vibrant Challan Input Qty', field: 'OutputQuantity', colId: 'OutputQuantity' },
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
            var year = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var day = Number(dateParts[0]);
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
      { headerName: 'Remaining Quantity', field: 'RemainingQuantity', colId: 'RemainingQuantity' }
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

    this.context = this;

    this.getCloseChallanReport();
  }

  public getCloseChallanReport() {
    this.generalService.getCloseChallanReport()
      .subscribe(
        result => {
          debugger;
          this.closeChallanReportModelList = result;
        },
        error => {
          this.closeChallanReportModelList = [];
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public whereUsed(event) {
    this.router.navigate(['/basf-challan-po-where-used-report'], {
      queryParams: {
        challanId: event.data.ChallanId,
        isPO: false
      }
    });
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
