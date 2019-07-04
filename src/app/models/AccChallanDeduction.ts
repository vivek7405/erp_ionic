import { IonDatetime } from '@ionic/angular';

export class AccChallanDeduction {
    public AccChallanDeductionId: number;
    public OutAccId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
