import { IonDatetime } from '@ionic/angular';
import { ChallanProductModel } from './ChallanProductModel';

export class AssemblyChallanDeductionModel {
    public AssemblyChallanDeductionId: number;
    public OutAssemblyId?: number;
    public ChallanProductId?: number;
    public OutQuantity?: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ChallanProduct: ChallanProductModel;
}
