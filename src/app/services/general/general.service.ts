import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { SuccessResponse } from 'src/app/models/SuccessResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ChallanDetailModel } from 'src/app/models/ChallanDetailModel';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { VendorChallanModel } from 'src/app/models/VendorChallanModel';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { VendorChallanNoModel } from 'src/app/models/VendorChallanNoModel';
import { ProductType } from 'src/app/models/ProductType';
import { ProductDetailModel } from 'src/app/models/ProductDetailModel';
import { ProductMapping } from 'src/app/models/ProductMapping';
import { ViewPODetailModel } from 'src/app/models/ViewPODetailModel';
import { BASFInvoiceModel } from 'src/app/models/BASFInvoiceModel';
import { BASFChallanPOWhereUsedModel } from 'src/app/models/BASFChallanPOWhereUsedModel';
import { CloseChallanReportModel } from 'src/app/models/CloseChallanReportModel';
import { FGAndSemiStockReportModel } from 'src/app/models/FGAndSemiStockReportModel';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends CommonService {

  constructor(public http: HttpClient) {
    super();
  }

  public addOrUpdateProductDetail(productDetail: ProductDetail): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateProductDetail', productDetail);
  }

  public getAllProductDetails() {
    return this.http.get<ProductDetail[]>(environment.apiBaseUrl + 'general/GetAllProductDetails');
  }

  public getAllProductDetailsForPO() {
    return this.http.get<ProductDetail[]>(environment.apiBaseUrl + 'general/GetAllProductDetailsForPO');
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

  public getAllPODetails() {
    return this.http.get<ViewPODetailModel[]>(environment.apiBaseUrl + 'general/GetAllPODetails');
  }

  public getMainProductRemainingQuantity() {
    return this.http.get<ProductQuantity[]>(environment.apiBaseUrl + 'general/GetMainProductRemainingQuantity');
  }

  public getAccProductRemainingQuantity() {
    return this.http.get<ProductQuantity[]>(environment.apiBaseUrl + 'general/GetAccProductRemainingQuantity');
  }

  public getAssemblyProductRemainingQuantity() {
    return this.http.get<ProductQuantity[]>(environment.apiBaseUrl + 'general/GetAssemblyProductRemainingQuantity');
  }

  public addOrUpdateVendorChallan(vendorChallan: VendorChallanModel) {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateVendorChallan', vendorChallan);
  }

  public getAllBASFChallanByProductId(productIdModel: ProductIdModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/GetAllBASFChallanByProductId', productIdModel);
  }

  public getAllBASFPOByProductId(productIdModel: ProductIdModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/GetAllBASFPOByProductId', productIdModel);
  }

  public getAllVendorChallans() {
    return this.http.get<VendorChallanModel[]>(environment.apiBaseUrl + 'general/GetAllVendorChallans');
  }

  public getAllNgVendorChallans() {
    return this.http.get<VendorChallanModel[]>(environment.apiBaseUrl + 'general/GetAllNgVendorChallans');
  }

  public getVendorChallanByVendorChallanNo(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<VendorChallanModel>(environment.apiBaseUrl + 'general/GetVendorChallanByVendorChallanNo', vendorChallanNoModel);
  }

  public printVendorChallanByVendorChallanNo(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post(environment.apiBaseUrl + 'general/PrintVendorChallanByVendorChallanNo', vendorChallanNoModel, { responseType: 'arraybuffer' });
  }

  public getBASFChallanByBASFChallanId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<ViewChallanDetailModel>(environment.apiBaseUrl + 'general/GetBASFChallanByBASFChallanId', vendorChallanNoModel);
  }

  public getBASFPOByBASFPOId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<ViewPODetailModel>(environment.apiBaseUrl + 'general/GetBASFPOByBASFPOId', vendorChallanNoModel);
  }

  public getProductDetailsByProductId(productIdModel: ProductIdModel) {
    return this.http.post<ProductDetailModel>(environment.apiBaseUrl + 'general/GetProductDetailsByProductId', productIdModel);
  }

  public getAllAssemblyProducts() {
    return this.http.get<ProductDetail[]>(environment.apiBaseUrl + 'general/GetAllAssemblyProducts');
  }

  public addOrUpdateProductMappings(productMappings: ProductMapping[]) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/AddOrUpdateProductMappings', productMappings);
  }

  public deleteProductByProductId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/DeleteProductByProductId', vendorChallanNoModel);
  }

  public deleteBASFChallanByChallanId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/DeleteBASFChallanByChallanId', vendorChallanNoModel);
  }

  public deleteBASFPOByPOId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/DeleteBASFPOByPOId', vendorChallanNoModel);
  }

  public deleteVendorChallanByVendorChallanNo(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/DeleteVendorChallanByVendorChallanNo', vendorChallanNoModel);
  }

  public forceDeleteProductByProductId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/ForceDeleteProductByProductId', vendorChallanNoModel);
  }

  public forceDeleteBASFChallanByChallanId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/ForceDeleteBASFChallanByChallanId', vendorChallanNoModel);
  }

  public forceDeleteBASFPOByPOId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/ForceDeleteBASFPOByPOId', vendorChallanNoModel);
  }

  public getMainProductRemainingQuantityBASFInvoice() {
    return this.http.get<ProductQuantity[]>(environment.apiBaseUrl + 'general/GetMainProductRemainingQuantityBASFInvoice');
  }

  public addOrUpdateBASFInvoice(basfInvoice: BASFInvoiceModel) {
    return this.http.post<SuccessResponse>(environment.apiBaseUrl + 'general/AddOrUpdateBASFInvoice', basfInvoice);
  }

  public getAllBASFInvoices() {
    return this.http.get<BASFInvoiceModel[]>(environment.apiBaseUrl + 'general/GetAllBASFInvoices');
  }

  public deleteBASFInvoiceByBASFInvoiceId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<any>(environment.apiBaseUrl + 'general/DeleteBASFInvoiceByBASFInvoiceId', vendorChallanNoModel);
  }

  public getBASFInvoiceByBASFInvoiceId(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<BASFInvoiceModel>(environment.apiBaseUrl + 'general/GetBASFInvoiceByBASFInvoiceId', vendorChallanNoModel);
  }

  public getBASFChallanWhereUsedInVendorChallansReport(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<BASFChallanPOWhereUsedModel[]>(environment.apiBaseUrl + 'general/GetBASFChallanWhereUsedInVendorChallansReport', vendorChallanNoModel);
  }

  public getBASFPOWhereUsedInVendorChallansReport(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<BASFChallanPOWhereUsedModel[]>(environment.apiBaseUrl + 'general/GetBASFPOWhereUsedInVendorChallansReport', vendorChallanNoModel);
  }

  public getBASFChallanWhereUsedInBASFInvoicesReport(vendorChallanNoModel: VendorChallanNoModel) {
    return this.http.post<BASFChallanPOWhereUsedModel[]>(environment.apiBaseUrl + 'general/GetBASFChallanWhereUsedInBASFInvoicesReport', vendorChallanNoModel);
  }

  public getCloseChallanReport() {
    return this.http.get<CloseChallanReportModel[]>(environment.apiBaseUrl + 'general/GetCloseChallanReport');
  }

  public getFGStockReport() {
    return this.http.get<FGAndSemiStockReportModel[]>(environment.apiBaseUrl + 'general/GetFGStockReport');
  }

  public getSemiStockReport() {
    return this.http.get<FGAndSemiStockReportModel[]>(environment.apiBaseUrl + 'general/GetSemiStockReport');
  }
}
