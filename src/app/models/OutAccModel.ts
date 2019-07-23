import { IonDatetime } from '@ionic/angular';
import { OutStockModel } from './OutStockModel';
import { AccChallanDeductionModel } from './AccChallanDeductionModel';
import { BASFChallanSelection } from './BASFChallanSelection';
import { AccPODeductionModel } from './AccPODeductionModel';
import { BASFPOSelection } from './BASFPOSelection';
import { ProductQuantity } from './ProductQuantity';

export class OutAccModel {
    public OutAccId: number;
    public OutStockId: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ProductId: number;
    public SplitRatio: number;

    public OutStock: OutStockModel;
    public AccChallanDeductions: AccChallanDeductionModel[];
    public AccPODeductions: AccPODeductionModel[];

    public basfChallanSelection: BASFChallanSelection[];
    public basfPOSelection: BASFPOSelection[];

    public isManual: boolean;
    public isManualPO: boolean;

    public productAccQnts: ProductQuantity[];
    public selectedProductAccQnt: ProductQuantity;
}
