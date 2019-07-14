import { IonDatetime } from '@ionic/angular';

export class PODeduction {
    public PODeductionId: number;
    public OutStockId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
