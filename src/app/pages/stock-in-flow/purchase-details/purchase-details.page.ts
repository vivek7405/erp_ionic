import { Component, OnInit } from '@angular/core';
import { StockInFlowService } from 'src/app/services/stock-in-flow/stock-in-flow.service';
import { PurchaseOrderModel } from 'src/app/models/PurchaseOrderModel';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.page.html',
  styleUrls: ['./purchase-details.page.scss'],
})
export class PurchaseDetailsPage implements OnInit {
  public purchaseOrders: PurchaseOrderModel[];
  constructor(public stockInFlowService: StockInFlowService) { }

  ngOnInit() {
    this.getAllPurchaseOrders();
  }

  public getAllPurchaseOrders() {
    this.stockInFlowService.getAllPurchaseOrders()
      .subscribe(
        result => {
          debugger;
          this.purchaseOrders = result;
        }
      );
  }

}
