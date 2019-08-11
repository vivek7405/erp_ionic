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

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService) { }

  ngOnInit() {
    this.columnDefsVendorChallan = [
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Material Desc', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
      { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
      { headerName: 'Remaining Quantity', field: 'RemainingQuantity', colId: 'RemainingQuantity' },
      { headerName: 'Total Used', field: 'TotalUsed', colId: 'TotalUsed' },
      { headerName: 'Vendor Challan No', field: 'VendorChallanNo', colId: 'VendorChallanNo' },
      { headerName: 'Vendor Challan Date', field: 'VendorChallanDate', colId: 'VendorChallanDate' },
      { headerName: 'Out Quantity', field: 'VendorChallanOutQnt', colId: 'VendorChallanOutQnt' }
    ];

    this.columnDefsBASFInvoice = [
      { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
      { headerName: 'Input Material Desc', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
      { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
      { headerName: 'Remaining Quantity', field: 'RemainingQuantity', colId: 'RemainingQuantity' },
      { headerName: 'Total Used', field: 'TotalUsed', colId: 'TotalUsed' },
      { headerName: 'BASF Invoice No', field: 'VendorChallanNo', colId: 'VendorChallanNo' },
      { headerName: 'BASF Invoice Date', field: 'VendorChallanDate', colId: 'VendorChallanDate' },
      { headerName: 'Out Quantity', field: 'VendorChallanOutQnt', colId: 'VendorChallanOutQnt' }
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
}
