import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { PartType } from 'src/app/models/PartType';
import { SuccessResponse } from 'src/app/models/SuccessResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ChallanDetail } from 'src/app/models/ChallanDetail';
import { ChallanProduct } from 'src/app/models/ChallanProduct';
import { ChallanDetailModel } from 'src/app/models/ChallanDetailModel';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { ChallanProductModel } from 'src/app/models/ChallanProductModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { BASFChallanDeduction } from 'src/app/models/BASFChallanDeduction';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { ProductType } from 'src/app/models/ProductType';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends CommonService {

  constructor(public http: HttpClient) {
    super();
  }

  public addOrUpdatePartType(partType: PartType): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdatePartType', partType);
  }

  public getAllPartTypes() {
    return this.http.get<PartType[]>(environment.apiBaseUrl + 'general/GetAllPartTypes');
  }

  public addOrUpdateProductDetail(productDetail: ProductDetail): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateProductDetail', productDetail);
  }

  public getAllProductDetails() {
    return this.http.get<ProductDetail[]>(environment.apiBaseUrl + 'general/GetAllProductDetails');
  }

  public getAllProductTypes() {
    return this.http.get<ProductType[]>(environment.apiBaseUrl + 'general/GetAllProductTypes');
  }

  // public addOrUpdateChallanDetail(challanDetail: ChallanDetail) {
  //   return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateChallanDetail', challanDetail);
  // }

  // public addOrUpdateChallanProduct(challanProduct: ChallanProduct) {
  //   return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateChallanProduct', challanProduct);
  // }

  public addOrUpdateChallan(challanDetail: ChallanDetailModel) {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateChallan', challanDetail);
  }

  public getAllChallanDetails() {
    return this.http.get<ViewChallanDetailModel[]>(environment.apiBaseUrl + 'general/GetAllChallanDetails');
  }

  public getProductRemainingQuantity() {
    return this.http.get<ProductQuantity[]>(environment.apiBaseUrl + 'general/GetProductRemainingQuantity');
  }

  public addOrUpdateVendorChallan(vendorChallan: VendorChallanModel) {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateVendorChallan', vendorChallan);
  }

  public getAllBASFChallanByProductId(productIdModel: ProductIdModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/GetAllBASFChallanByProductId', productIdModel);
  }

  public getAllVendorChallans() {
    return this.http.get<VendorChallanModel[]>(environment.apiBaseUrl + 'general/GetAllVendorChallans');
  }

  public getVendorChallanByVendorChallanNo(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<VendorChallanModel>(environment.apiBaseUrl + 'general/GetVendorChallanByVendorChallanNo', vendorChallanNoModel);
  }
}
