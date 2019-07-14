import { IonDatetime } from '@ionic/angular';

export class AccPODeduction {
    public AccPODeductionId: number;
    public OutAccId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
