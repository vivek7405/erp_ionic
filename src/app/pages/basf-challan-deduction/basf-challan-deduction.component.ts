import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { OutStockModel } from 'src/app/models/OutStockModel';
import { BASFChallanSelection } from 'src/app/models/BASFChallanSelection';
import { ProductIdModel } from 'src/app/models/ProductIdModel';

@Component({
  selector: 'app-basf-challan-deduction',
  templateUrl: './basf-challan-deduction.component.html',
  styleUrls: ['./basf-challan-deduction.component.scss'],
})
export class BasfChallanDeductionComponent implements OnInit {
  @Input() public outStock: OutStockModel;
  public basfChallanSelection: BASFChallanSelection[];

  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    debugger;
    this.getAllBASFChallanByProductIdForViewing(this.outStock.ProductId);
  }

  public getAllBASFChallanByProductIdForViewing(productId: number) {
    let productIdModel = new ProductIdModel();
    productIdModel.ProductId = productId;
    this.generalService.getAllBASFChallanByProductId(productIdModel)
      .subscribe(
        result => {
          debugger;
          this.basfChallanSelection = result.BASFChallanSelections;

          let outputQnt = this.outStock.OutputQuantity;
          this.basfChallanSelection.forEach(challan => {
            debugger;
            if (outputQnt > 0) {
              if (challan.RemainingQuantity < outputQnt) {
                challan.outQuantity = challan.RemainingQuantity;
                outputQnt -= challan.RemainingQuantity;
                challan.qntAfterDeduction = 0;
              } else {
                challan.outQuantity = outputQnt;
                outputQnt = 0;
                challan.qntAfterDeduction = challan.RemainingQuantity - challan.outQuantity;
              }

              challan.IsChecked = true;
            } else {
              challan.qntAfterDeduction = challan.RemainingQuantity;
            }
          });
        },
        error => {
          alert('Something went wrong!');
        }
      );
  }
}
