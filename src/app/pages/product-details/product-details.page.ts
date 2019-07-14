import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController } from '@ionic/angular';
import { ProductType } from 'src/app/models/ProductType';
import { EProductCatagorys } from 'src/app/enums/EProductCatagory';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  public productDetails: ProductDetail[];
  public productTypes: ProductType[];
  public productDetail: ProductDetail;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.productDetail = new ProductDetail();
    this.getAllProductTypes();
    this.getAllProductDetails();
  }

  public getAllProductTypes() {
    let selfObj = this;
    this.generalService.getAllProductTypes()
      .subscribe(
        result => {
          selfObj.productTypes = result;
        },
        error => {
          alert(error);
        }
      );
  }

  public getAllProductDetails() {
    let selfObj = this;
    this.generalService.getAllProductDetails()
      .subscribe(
        result => {
          selfObj.productDetails = result;
        },
        error => {
          alert(error);
        }
      );
  }

  public splitRatioChanged() {
    if (this.productDetail.SplitRatio < 0) {
      setTimeout(x => {
        this.productDetail.SplitRatio = 0;
      }, 1);
    }
  }

  public addOrUpdateProductDetails() {
    debugger;
    let isProductTypeMain: boolean = this.productDetail.ProductTypeId !== undefined && this.isProductCategoryMain();
    let isInputCodeValid = this.productDetail.InputCode !== undefined && this.productDetail.InputCode.trim() !== '';
    let isInputMaterialDescValid = this.productDetail.InputMaterialDesc !== undefined && this.productDetail.InputMaterialDesc.trim() !== '';
    let isOutputCodeValid = this.productDetail.OutputCode !== undefined && this.productDetail.OutputCode.trim() !== '';
    let isOutputMaterialDescValid = this.productDetail.OutputMaterialDesc !== undefined && this.productDetail.OutputMaterialDesc.trim() !== '';
    let isProjectNameValid = this.productDetail.ProjectName !== undefined && this.productDetail.ProjectName.trim() !== '';
    let isSplitRatioValid = this.productDetail.SplitRatio !== undefined && this.productDetail.SplitRatio !== 0;

    if (this.productDetail.ProductTypeId == undefined || this.productDetail.ProductTypeId == null) {
      alert('Please select Product Type.');
    } else if (!isInputCodeValid) {
      alert('Please enter Input Code.');
    } else if (!isInputMaterialDescValid) {
      alert('Please enter Input Material Description.');
    } else if (isProductTypeMain && !isOutputCodeValid) {
      alert('Please enter Output Code.');
    } else if (isProductTypeMain && !isOutputMaterialDescValid) {
      alert('Please enter Output Material Description.');
    } else if (isProductTypeMain && !isProjectNameValid) {
      alert('Please enter Project Name.');
    } else if (isProductTypeMain && !isSplitRatioValid) {
      alert('Please enter a valid Split Ratio.');
    } else {
      if (confirm('Are you sure you want to add this Product?')) {
        if (!isProductTypeMain) {
          this.productDetail.OutputCode = undefined;
          this.productDetail.OutputMaterialDesc = undefined;
          this.productDetail.ProjectName = undefined;
          this.productDetail.SplitRatio = 1;
        }
        this.generalService.addOrUpdateProductDetail(this.productDetail)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, 'Product Details added successfully.');
              this.getAllProductDetails();
            },
            error => {
              alert(error);
            }
          );
      }
    }
  }

  public isProductCategoryMain() {
    if (this.productTypes != undefined && this.productTypes != null && this.productDetail != undefined && this.productDetail != null && this.productDetail.ProductTypeId != undefined && this.productDetail.ProductTypeId != null) {
      let productCategoryId = this.productTypes.find(x => x.ProductTypeId == this.productDetail.ProductTypeId).ProductCategoryId;
      if (productCategoryId == EProductCatagorys.Main)
        return true;
      else
        return false;
    } else
      return true;
  }
}
