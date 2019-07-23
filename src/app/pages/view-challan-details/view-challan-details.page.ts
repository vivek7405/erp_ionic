import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { Router } from '@angular/router';
import { ViewPODetailModel } from 'src/app/models/ViewPODetailModel';
import { EditdeleteComponent } from '../editdelete/editdelete.component';

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

  constructor(public generalService: GeneralService, public router: Router) { }

  ngOnInit() {
    this.columnDefsChallan = [
      { headerName: 'Challan No', field: 'ChallanDetail.ChallanNo' },
      { headerName: 'Challan Date', field: 'ChallanDetail.ChallanDate' },
      { headerName: 'Total Stock In', field: 'totalStockIn' },
      { headerName: 'Create Date', field: 'ChallanDetail.CreateDate' },
      { headerName: 'Edit Date', field: 'ChallanDetail.EditDate' },
      { headerName: 'Actions', cellRenderer: 'editdelete' }
    ];

    this.columnDefsPO = [
      { headerName: 'PO No', field: 'PODetail.PONo' },
      { headerName: 'PO Date', field: 'PODetail.PODate' },
      { headerName: 'Total Stock In', field: 'totalStockIn' },
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

    this.getAllChallanDetails();
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
  }
}
