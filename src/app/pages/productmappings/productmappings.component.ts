import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailModel } from 'src/app/models/ProductDetailModel';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { GeneralService } from 'src/app/services/general/general.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ProductMapping } from 'src/app/models/ProductMapping';
import { ProductType } from 'src/app/models/ProductType';
import { EProductCatagorys } from 'src/app/enums/EProductCatagory';

@Component({
  selector: 'app-productmappings',
  templateUrl: './productmappings.component.html',
  styleUrls: ['./productmappings.component.scss'],
})
export class ProductmappingsComponent implements OnInit {
  @Input() productId: number;
  public productDetail: ProductDetailModel;
  public productDetails: ProductDetail[];
  public productMappingValues = [];
  public productTypes: ProductType[];

  constructor(public generalService: GeneralService, public toastCtrl: ToastController, public modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.productId != undefined && this.productId != null && this.productId > 0) {
      this.getAllAssemblyProducts();
      this.getAllProductTypes();
    }
  }

  public getAllProductTypes() {
    this.generalService.getAllProductTypes()
      .subscribe(
        result => {
          this.productTypes = result;
        },
        error => {

        }
      );
  }

  public isProductCategoryMain() {
    if (this.productTypes != undefined && this.productTypes != null && this.productDetail != undefined && this.productDetail != null && this.productDetail.ProductDetail != undefined && this.productDetail.ProductDetail != null && this.productDetail.ProductDetail.ProductTypeId != undefined && this.productDetail.ProductDetail.ProductTypeId != null) {
      let productCategoryId = this.productTypes.find(x => x.ProductTypeId == this.productDetail.ProductDetail.ProductTypeId).ProductCategoryId;
      if (productCategoryId == EProductCatagorys.Main)
        return true;
      else
        return false;
    } else
      return true;
  }

  public getProductDetailsByProductId() {
    let productIdModel = new ProductIdModel();
    productIdModel.ProductId = this.productId;
    this.generalService.getProductDetailsByProductId(productIdModel)
      .subscribe(
        result => {
          debugger;
          result.ProductMappings.forEach(mapping => {
            this.productMappingValues.push(mapping.MappingProductId);
          });

          this.productDetail = result;
        },
        error => {

        }
      );
  }

  public getAllAssemblyProducts() {
    this.generalService.getAllAssemblyProducts()
      .subscribe(
        result => {
          debugger;
          this.productDetails = result;
          this.getProductDetailsByProductId();
        },
        error => {

        }
      )
  }

  public saveProductMappings() {
    debugger;
    let productMappings: ProductMapping[] = [];

    this.productMappingValues.forEach(mappingProductId => {
      let productMapping = new ProductMapping();
      productMapping.ProductId = this.productId;
      productMapping.MappingProductId = mappingProductId;

      productMappings.push(productMapping);
    });

    if (productMappings.length == 0) {
      let productMapping = new ProductMapping();
      productMapping.ProductId = this.productId;
      productMappings.push(productMapping);
    }

    this.generalService.addOrUpdateProductMappings(productMappings)
      .subscribe(
        result => {
          this.generalService.toast(this.toastCtrl, 'Product Mappings saved successfully.');
          this.modalCtrl.dismiss();
        },
        error => {
          this.generalService.toast(this.toastCtrl, 'Something went wrong while saving Product Mappings.');
          this.modalCtrl.dismiss();
        });
  }
}
