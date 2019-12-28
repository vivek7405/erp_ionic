import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { Printer } from '@ionic-native/printer/ngx';
import { ToastController } from '@ionic/angular';
import { WindowRefService } from 'src/app/services/common/common.service';
import { BASFInvoiceModel } from 'src/app/models/BASFInvoiceModel';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { VendorChallanGridModel } from 'src/app/models/VendorChallanGridModel';

@Component({
  selector: 'app-basf-invoice-info',
  templateUrl: './basf-invoice-info.page.html',
  styleUrls: ['./basf-invoice-info.page.scss'],
})
export class BasfInvoiceInfoPage implements OnInit {
  public vendorChallanGrid: VendorChallanGridModel[];
  public basfInvoice: BASFInvoiceModel;

  public basfInvoiceId: number;
  public basfInvoiceNo: string;
  public basfInvoiceDate: any;
  public totalOutStock: any;

  public window: any;
  public gridOptions: any;
  public columnDefs: any;
  public context: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService, public printer: Printer, public toastCtrl: ToastController, public windowRef: WindowRefService) { }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.window = this.windowRef.nativeWindow;
    this.activatedRoute.queryParams.subscribe((result) => {
      debugger;
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = result.basfInvoiceId;
      this.basfInvoiceId = result.basfInvoiceId;
      this.basfInvoiceNo = result.basfInvoiceNo;
      this.basfInvoiceDate = result.basfInvoiceDate;
      this.totalOutStock = result.totalOutStock;

      //   this.generalService.getBASFInvoiceByBASFInvoiceId(vendorChallanNoModel)
      //     .subscribe(
      //       result => {
      //         this.basfInvoice = result;
      //         this.basfInvoice.outputQuantity = 0;

      //         this.basfInvoice.InvoiceOutStocks.forEach(outStock => {
      //           outStock.mainQntSum = 0;

      //           outStock.InvoiceChallanDeductions.forEach(challanDeduction => {
      //             outStock.mainQntSum += challanDeduction.OutQuantity;
      //           });

      //           this.basfInvoice.outputQuantity += outStock.OutputQuantity;
      //         });
      //       },
      //       error => {
      //         alert('Some error occurred while fetching details.');
      //       }
      //     );
      // });

      this.columnDefs = [
        { headerName: 'Project Name', field: 'ProjectName', colId: 'ProjectName' },
        { headerName: 'Output Code', field: 'OutputCode', colId: 'OutputCode' },
        { headerName: 'Output Material Description', field: 'OutputMaterialDesc', colId: 'OutputMaterialDesc' },
        { headerName: 'Output Quantity', field: 'OutputQuantity', colId: 'OutputQuantity' },
        { headerName: 'Input Code', field: 'InputCode', colId: 'InputCode' },
        { headerName: 'Input Material Description', field: 'InputMaterialDesc', colId: 'InputMaterialDesc' },
        { headerName: 'Input Quantity', field: 'InputQuantity', colId: 'InputQuantity' },
        { headerName: 'Part Type', field: 'PartType', colId: 'PartType' },
        { headerName: 'BASF Challan Number', field: 'BASFChallanNo', colId: 'BASFChallanNo' },
        { headerName: 'Balance', field: 'Balance', colId: 'Balance' }
      ];

      //this.components = { showCellRenderer: this.createShowCellRenderer() };

      this.gridOptions = {
        defaultColDef: {
          sortable: true,
          filter: true,
          resizable: true
        }
      };

      this.context = this;

      this.window = this.windowRef.nativeWindow;

      this.generalService.getBASFInvoiceGridByBASFInvoiceId(vendorChallanNoModel)
        .subscribe(
          result => {
            debugger;
            this.vendorChallanGrid = result;
          });
    },
      error => {
        alert('Some error occurred while fetching details.');
      }
    );
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }

}
