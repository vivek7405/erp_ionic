import { IonDatetime } from '@ionic/angular';

export class AssemblyPODeduction {
    public AssemblyPODeductionId: number;
    public OutAssemblyId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
}
