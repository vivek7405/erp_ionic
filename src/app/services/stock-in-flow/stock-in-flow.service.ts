import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { SuccessResponse } from 'src/app/models/SuccessResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PurchaseOrderModel } from 'src/app/models/PurchaseOrderModel';

@Injectable({
  providedIn: 'root'
})
export class StockInFlowService extends CommonService {

  constructor(public http: HttpClient) {
    super();
  }

  public addOrUpdatePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'stockinflow/AddOrUpdatePurchaseOrder', purchaseOrder);
  }

  public getAllPurchaseOrders() {
    return this.http.get<PurchaseOrderModel[]>(environment.apiBaseUrl + 'stockinflow/GetAllPurchaseOrders');
  }
}
