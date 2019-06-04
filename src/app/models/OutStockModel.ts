import { IonDatetime } from '@ionic/angular';
import { ChallanDeduction } from './ChallanDeduction';

export class OutStockModel {
    public OutputCode: number;
    public VendorChallanNo: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
    public ProductId: number;
    public ChallanDeductions: ChallanDeduction[];
}
