import { IonDatetime } from '@ionic/angular';
import { ChallanDeductionModel } from './ChallanDeductionModel';

export class OutStockModel {
    public OutputCode: number;
    public VendorChallanNo: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
    public ProductId: number;
    public ChallanDeductions: ChallanDeductionModel[];
}
