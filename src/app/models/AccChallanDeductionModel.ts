import { IonDatetime } from '@ionic/angular';
import { ChallanProductModel } from './ChallanProductModel';

export class AccChallanDeductionModel {
    public AccChallanDeductionId: number;
    public OutAccId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ChallanProduct: ChallanProductModel;
}
