import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { BASFChallanPOWhereUsedModel } from 'src/app/models/BASFChallanPOWhereUsedModel';

@Component({
  selector: 'app-basf-challan-po-where-used-report',
  templateUrl: './basf-challan-po-where-used-report.page.html',
  styleUrls: ['./basf-challan-po-where-used-report.page.scss'],
})
export class BasfChallanPoWhereUsedReportPage implements OnInit {
  public isPO: boolean;
  public isInvoice: boolean;
  public challanWhereUsedInVendorChallansList: BASFChallanPOWhereUsedModel[];
  public challanWhereUsedInBASFInvoicesList: BASFChallanPOWhereUsedModel[];
  public gridOptions: any;
  public columnDefsVendorChallan: any;
  public columnDefsBASFInvoice: any;
  public context: any;
  public challanId: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService) { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.columnDefsVendorChallan = [
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Material Desc', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
      { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
      { headerName: 'Total Used', field: 'TotalUsed', colId: 'TotalUsed' },
      { headerName: 'Remaining Quantity', field: 'RemainingQuantity', colId: 'RemainingQuantity' },
      { headerName: 'Vibrant Challan No', field: 'VendorChallanNo', colId: 'VendorChallanNo' },
      { headerName: 'Output Code', field: 'OutputCode', colId: 'OutputCode' },
      { headerName: 'Out Quantity', field: 'VendorChallanOutQnt', colId: 'VendorChallanOutQnt' },
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
      }
    ];

    this.columnDefsBASFInvoice = [
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Material Desc', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
      { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
      { headerName: 'Total Used', field: 'TotalUsed', colId: 'TotalUsed' },
      { headerName: 'Remaining Quantity', field: 'RemainingQuantity', colId: 'RemainingQuantity' },
      { headerName: 'BASF Invoice No', field: 'BASFInvoiceNo', colId: 'VendorChallanNo' },
      { headerName: 'Output Code', field: 'OutputCode', colId: 'OutputCode' },
      { headerName: 'Out Quantity', field: 'BASFInvoiceOutQnt', colId: 'VendorChallanOutQnt' },
      {
        headerName: 'BASF Invoice Date', field: 'VendorChallanDate', colId: 'VendorChallanDate', filter: 'agDateColumnFilter',
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
      }
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

    this.activatedRoute.queryParams.subscribe((params) => {
      debugger;
      if (params && params.challanId && params.challanId != 0 && params.isPO != undefined && params.isPO != null) {
        this.isPO = params.isPO == "true" ? true : false;
        this.challanId = params.challanId;

        let vendorChallanNoModel = new VendorChallanNoModel();
        vendorChallanNoModel.VendorChallanNo = params.challanId;
        if (this.isPO) {
          this.generalService.getBASFPOWhereUsedInVendorChallansReport(vendorChallanNoModel)
            .subscribe(
              result => {
                debugger;
                this.challanWhereUsedInVendorChallansList = result;
              },
              error => {
                this.challanWhereUsedInVendorChallansList = [];
                alert('Some error occurred while fetching details.');
              }
            );
        } else {
          this.generalService.getBASFChallanWhereUsedInVendorChallansReport(vendorChallanNoModel)
            .subscribe(
              result => {
                debugger;
                this.challanWhereUsedInVendorChallansList = result;
              },
              error => {
                this.challanWhereUsedInVendorChallansList = [];
                alert('Some error occurred while fetching details.');
              }
            );
        }
      }
    });
  }

  public invoiceSwitched() {
    if (!this.isInvoice) {
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = this.challanId;
      this.generalService.getBASFChallanWhereUsedInBASFInvoicesReport(vendorChallanNoModel)
        .subscribe(
          result => {
            debugger;
            this.challanWhereUsedInBASFInvoicesList = result;
          },
          error => {
            this.challanWhereUsedInBASFInvoicesList = [];
            alert('Some error occurred while fetching details.');
          }
        );
    }
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }

}
