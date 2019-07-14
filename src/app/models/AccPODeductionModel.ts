import { IonDatetime } from '@ionic/angular';
import { POProductModel } from './POProductModel';

export class AccPODeductionModel {
    public AccPODeductionId: number;
    public OutAccId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public POProduct: POProductModel;
}
