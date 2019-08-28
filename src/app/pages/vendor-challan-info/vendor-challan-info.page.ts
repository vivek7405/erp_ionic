import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { ToastController } from '@ionic/angular';
import { WindowRefService, ICustomWindow } from 'src/app/services/common/common.service';
import { jsPDF } from 'jspdf';
import { VendorChallanGridModel } from 'src/app/models/VendorChallanGridModel';

@Component({
  selector: 'app-vendor-challan-info',
  templateUrl: './vendor-challan-info.page.html',
  styleUrls: ['./vendor-challan-info.page.scss'],
})
export class VendorChallanInfoPage implements OnInit {
  //public vendorChallan: VendorChallanModel;
  public vendorChallanGrid: VendorChallanGridModel[];
  public window: any;

  public vendorChallanNo: number;
  public vendorChallanDate: any;
  public totalOutStock: any;

  public gridOptions: any;
  public columnDefs: any;
  public context: any;
  public components: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService, public printer: Printer, public toastCtrl: ToastController, public windowRef: WindowRefService) {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
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
      { headerName: 'Balance', field: 'Balance', colId: 'Balance' },
      {
        headerName: 'BASF PO Number', field: 'BASFPONumber', colId: 'BASFPONumber',
        //cellRenderer: 'showCellRenderer',
        rowSpan: function (params) {
          debugger;
          return params.data.RowSpan == 0 ? 1 : params.data.RowSpan;
        },
        cellClassRules: { "show-cell": "value !== undefined" }
      }
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
    this.activatedRoute.queryParams
      .subscribe(
        result => {
          debugger;
          let vendorChallanNoModel = new VendorChallanNoModel();
          vendorChallanNoModel.VendorChallanNo = result.vendorChallanNo;
          this.vendorChallanNo = result.vendorChallanNo;
          this.vendorChallanDate = result.vendorChallanDate;
          this.totalOutStock = result.totalOutStock;

          this.generalService.getVendorChallanGridByVendorChallanNo(vendorChallanNoModel)
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

    // this.generalService.getVendorChallanByVendorChallanNo(vendorChallanNoModel)
    //   .subscribe(
    //     result => {
    //       this.vendorChallan = result;
    //       this.vendorChallan.outputQuantity = 0;

    //       this.vendorChallan.OutStocks.forEach(outStock => {
    //         outStock.mainQntSum = 0;

    //         outStock.ChallanDeductions.forEach(challanDeduction => {
    //           outStock.mainQntSum += challanDeduction.OutQuantity;
    //         });

    //         outStock.OutAssemblys.forEach(assembly => {
    //           assembly.assemblyQntSum = 0;
    //           assembly.AssemblyChallanDeductions.forEach(assemblyChallanDeduction => {
    //             assembly.assemblyQntSum += assemblyChallanDeduction.OutQuantity;
    //           });
    //         });

    //         outStock.OutAccs.forEach(acc => {
    //           acc.accQntSum = 0;
    //           acc.AccChallanDeductions.forEach(accChallanDeduction => {
    //             acc.accQntSum += accChallanDeduction.OutQuantity;
    //           });
    //         });

    //         this.vendorChallan.outputQuantity += outStock.OutputQuantity;
    //       });
    //     },
    //     error => {
    //       alert('Some error occurred while fetching details.');
    //     }
    //   );
  }

  public createShowCellRenderer() {
    function ShowCellRenderer() { }
    ShowCellRenderer.prototype.init = function (params) {
      debugger;
      var cellBlank = !params.value;
      if (cellBlank) {
        return null;
      }
      this.ui = document.createElement('div');
      this.ui.innerHTML = '<div>' + params.value + '</div>';
    };
    ShowCellRenderer.prototype.getGui = function () {
      return this.ui;
    };
    return ShowCellRenderer;
  }

  print() {
    // var page = document.getElementById(contentDivId);
    // this.window.printer.print(page, 'vendor-challan-info.page.html');

    //this.window.print();

    let vendorChallanNoModel: VendorChallanNoModel = new VendorChallanNoModel();
    vendorChallanNoModel.VendorChallanNo = this.vendorChallanNo;
    this.generalService.printVendorChallanByVendorChallanNo(vendorChallanNoModel)
      .subscribe(
        result => {
          //this.sendPrintCommand(result);
          this.generalService.downLoadFile(result, 'Vibrant Challan - ' + this.vendorChallanNo);
        },
        error => {
          alert('Some error occurred while printing.');
        }
      );
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }

  private sendPrintCommand(result) {
    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: false,
      landscape: false,
      grayscale: true
    }

    const file = new Blob([result], { type: 'application/pdf' });
    let fileObjectUrl = window.URL.createObjectURL(file);
    this.printer.print(fileObjectUrl, options)
      .then(
        printResult => {
          this.generalService.toast(this.toastCtrl, 'Document sent to printer for printing!');
        },
        error => {
          this.generalService.toast(this.toastCtrl, 'There was some error printing the document.');
        });

    // this.printer.isAvailable()
    //   .then(
    //     available => {
    //       if (available) {
    //         let options: PrintOptions = {
    //           name: 'MyDocument',
    //           printerId: 'printer007',
    //           duplex: false,
    //           landscape: false,
    //           grayscale: true
    //         }

    //         const file = new Blob([result], { type: 'application/pdf' });
    //         let fileObjectUrl = window.URL.createObjectURL(file);
    //         this.printer.print(fileObjectUrl, options)
    //           .then(
    //             printResult => {
    //               this.generalService.toast(this.toastCtrl, 'Document sent to printer for printing!');
    //             },
    //             error => {
    //               this.generalService.toast(this.toastCtrl, 'There was some error printing the document.');
    //             });
    //       }
    //     },
    //     error => {
    //       this.generalService.toast(this.toastCtrl, 'Not able to find the printer!');
    //     });
  }
}
