import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ToastController } from '@ionic/angular';
import { ProductType } from 'src/app/models/ProductType';
import { EProductCatagorys } from 'src/app/enums/EProductCatagory';
import { ActivatedRoute } from '@angular/router';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  public productTypes: ProductType[];
  public productDetail: ProductDetail;

  public isEdit: boolean;

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public activatedRoute: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger;
      if (params && params.productId && params.productId != 0) {
        this.isEdit = true;
        this.generalService.getAllProductTypes()
          .subscribe(
            result => {
              this.productTypes = result;

              let productIdModel: ProductIdModel = new ProductIdModel();
              productIdModel.ProductId = params.productId;
              this.generalService.getProductDetailsByProductId(productIdModel)
                .subscribe(
                  prodDetailResult => {
                    this.productDetail = prodDetailResult.ProductDetail;
                  },
                  prodDetailError => {
                    alert('Some error occurred!');
                  }
                );
            },
            error => {
              alert('Some error occurred!');
            }
          );
      } else {
        this.productDetail = new ProductDetail();
        this.getAllProductTypes();
      }
    });

    // this.productDetail = new ProductDetail();
    // this.getAllProductTypes();    
  }

  public getAllProductTypes() {
    this.generalService.getAllProductTypes()
      .subscribe(
        result => {
          this.productTypes = result;
        },
        error => {
          alert(error);
        }
      );
  }

  // public getAllProductDetails() {  
  //   this.generalService.getAllProductDetails()
  //     .subscribe(
  //       result => {
  //         this.productDetails = result;
  //       },
  //       error => {
  //         alert(error);
  //       }
  //     );
  // }

  public splitRatioChanged() {
    if (this.productDetail.SplitRatio < 0) {
      setTimeout(x => {
        this.productDetail.SplitRatio = 0;
      }, 1);
    }
  }

  public addOrUpdateProductDetails() {
    debugger;
    let isProductTypeMain: boolean = this.productDetail.ProductTypeId && this.isProductCategoryMain();
    let isInputCodeValid = this.productDetail.InputCode && this.productDetail.InputCode.trim() !== '';
    let isInputMaterialDescValid = this.productDetail.InputMaterialDesc && this.productDetail.InputMaterialDesc.trim() !== '';
    let isOutputCodeValid = this.productDetail.OutputCode && this.productDetail.OutputCode.trim() !== '';
    let isOutputMaterialDescValid = this.productDetail.OutputMaterialDesc && this.productDetail.OutputMaterialDesc.trim() !== '';
    let isProjectNameValid = this.productDetail.ProjectName && this.productDetail.ProjectName.trim() !== '';
    let isSplitRatioValid = this.productDetail.SplitRatio && this.productDetail.SplitRatio !== 0;

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
      if (confirm('Are you sure you want to Submit?')) {
        if (!isProductTypeMain) {
          this.productDetail.OutputCode = undefined;
          this.productDetail.OutputMaterialDesc = undefined;
          this.productDetail.ProjectName = undefined;
          this.productDetail.SplitRatio = 1;
        }

        let successMsg = 'Product Details added successfully.';
        if (this.isEdit)
          successMsg = 'Product Details updated successfully.';

        this.generalService.addOrUpdateProductDetail(this.productDetail)
          .subscribe(
            result => {
              this.generalService.toast(this.toastCtrl, successMsg);

              this.productDetail = new ProductDetail();

              if (this.isEdit)
                this.location.back();
              //this.getAllProductDetails();
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
