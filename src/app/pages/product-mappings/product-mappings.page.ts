import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProductIdModel } from 'src/app/models/ProductIdModel';
import { ProductDetailModel } from 'src/app/models/ProductDetailModel';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ActivatedRoute } from '@angular/router';
import { ProductMapping } from 'src/app/models/ProductMapping';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-mappings',
  templateUrl: './product-mappings.page.html',
  styleUrls: ['./product-mappings.page.scss'],
})
export class ProductMappingsPage implements OnInit {
  public productId: number;
  public productDetail: ProductDetailModel;
  public productDetails: ProductDetail[];
  public productMappingValues = [];

  constructor(public generalService: GeneralService, public activatedRoute: ActivatedRoute, public toastCtrl: ToastController) { }

  ngOnInit() {
    debugger;
    this.activatedRoute.queryParams.subscribe((params) => {
      debugger;
      this.productId = params.productId;
      this.getAllAssemblyProducts();
    });
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
      let productMapping: ProductMapping = new ProductMapping();
      productMapping.ProductId = this.productId;
      productMapping.MappingProductId = mappingProductId;

      productMappings.push(productMapping);
    });

    this.generalService.addOrUpdateProductMappings(productMappings)
      .subscribe(
        result => {
          this.generalService.toast(this.toastCtrl, 'Product Mappings saved successfully.');
        },
        error => {
          this.generalService.toast(this.toastCtrl, 'Something went wrong while saving Product Mappings.');
        });
  }
}