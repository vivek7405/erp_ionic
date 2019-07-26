import { IonDatetime } from '@ionic/angular';
import { ChallanProductModel } from './ChallanProductModel';

export class InvoiceChallanDeductionModel {
    public InvoiceChallanDeductionId: number;
    public InvoiceOutStockId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ChallanProduct: ChallanProductModel;
}
