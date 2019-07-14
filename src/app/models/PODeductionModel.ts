import { IonDatetime } from '@ionic/angular';
import { POProductModel } from './POProductModel';

export class PODeductionModel {
    public PODeductionId: number;
    public OutStockId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public POProduct: POProductModel;
}
