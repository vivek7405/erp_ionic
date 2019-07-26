import { IonDatetime } from '@ionic/angular';

export class ChallanDeduction {
    public InvoiceChallanDeductionId: number;
    public InvoiceOutStockId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
