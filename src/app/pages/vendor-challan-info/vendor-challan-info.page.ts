import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { ToastController } from '@ionic/angular';
import { WindowRefService, ICustomWindow } from 'src/app/services/common/common.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-vendor-challan-info',
  templateUrl: './vendor-challan-info.page.html',
  styleUrls: ['./vendor-challan-info.page.scss'],
})
export class VendorChallanInfoPage implements OnInit {
  public vendorChallan: VendorChallanModel;
  public window: any;

  constructor(public activatedRoute: ActivatedRoute, public generalService: GeneralService, public printer: Printer, public toastCtrl: ToastController, public windowRef: WindowRefService) {
    this.window = this.windowRef.nativeWindow;
    this.activatedRoute.queryParams.subscribe((result) => {
      debugger;
      let vendorChallanNoModel = new VendorChallanNoModel();
      vendorChallanNoModel.VendorChallanNo = result.vendorChallanNo;
      this.generalService.getVendorChallanByVendorChallanNo(vendorChallanNoModel)
        .subscribe(
          result => {
            this.vendorChallan = result;
            this.vendorChallan.outputQuantity = 0;

            this.vendorChallan.OutStocks.forEach(outStock => {
              outStock.mainQntSum = 0;
              outStock.assemblyQntSum = 0;
              outStock.accQntSum = 0;

              outStock.ChallanDeductions.forEach(challanDeduction => {
                outStock.mainQntSum += challanDeduction.OutQuantity;
              });

              outStock.OutAssemblys.forEach(assembly => {
                assembly.AssemblyChallanDeductions.forEach(assemblyChallanDeduction => {
                  outStock.assemblyQntSum += assemblyChallanDeduction.OutQuantity;
                });
              });

              outStock.OutAccs.forEach(acc => {
                acc.AccChallanDeductions.forEach(accChallanDeduction => {
                  outStock.accQntSum += accChallanDeduction.OutQuantity;
                });
              });

              this.vendorChallan.outputQuantity += outStock.OutputQuantity;
            });
          },
          error => {
            alert('Some error occurred while fetching details.');
          }
        );
    });
  }

  ngOnInit() {
  }

  print() {
    // var page = document.getElementById(contentDivId);
    // this.window.printer.print(page, 'vendor-challan-info.page.html');

    //this.window.print();

    let vendorChallanNoModel: VendorChallanNoModel = new VendorChallanNoModel();
    vendorChallanNoModel.VendorChallanNo = this.vendorChallan.VendorChallanNo;
    this.generalService.printVendorChallanByVendorChallanNo(vendorChallanNoModel)
      .subscribe(
        result => {
          //this.sendPrintCommand(result);
          this.generalService.downLoadFile(result, 'Vibrant Challan - ' + this.vendorChallan.VendorChallanNo);
        },
        error => {
          alert('Some error occurred while printing.');
        }
      );
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
