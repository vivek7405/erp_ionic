import { IonDatetime } from '@ionic/angular';
import { ChallanProductModel } from './ChallanProductModel';

export class ChallanDeductionModel {
    public ChallanDeductionId: number;
    public OutputCode?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ChallanProduct: ChallanProductModel;
}
