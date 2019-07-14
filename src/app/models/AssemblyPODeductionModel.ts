import { IonDatetime } from '@ionic/angular';
import { POProductModel } from './POProductModel';

export class AssemblyPODeductionModel {
    public AssemblyPODeductionId: number;
    public OutAssemblyId?: number;
    public POProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public POProduct: POProductModel;
}
