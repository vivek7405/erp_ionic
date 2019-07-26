import { IonDatetime } from '@ionic/angular';
import { ProductQuantity } from './ProductQuantity';
import { BASFChallanSelection } from './BASFChallanSelection';
import { InvoiceChallanDeductionModel } from './InvoiceChallanDeductionModel';

export class InvoiceOutStockModel {
    public InvoiceOutStockId: number;
    public BASFInvoiceId: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
    public ProductId: number;
    public SplitRatio: number;
    public InvoiceChallanDeductions: InvoiceChallanDeductionModel[];

    public basfChallanSelection: BASFChallanSelection[];

    public isManual: boolean;

    public mainQntSum: number;

    public selectedProductQnt: ProductQuantity;
}
