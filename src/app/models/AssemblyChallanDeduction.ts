import { IonDatetime } from '@ionic/angular';

export class AssemblyChallanDeduction {
    public AssemblyChallanDeductionId: number;
    public OutAssemblyId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
