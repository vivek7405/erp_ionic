import { IonDatetime } from '@ionic/angular';
import { OutStockModel } from './OutStockModel';

export class VendorChallanModel {
    public VendorChallanNo: number;
    public VendorChallanDate: IonDatetime;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;
    public OutStocks: OutStockModel[];

    public outputQuantity: number;
    public IsNg: boolean;
}
