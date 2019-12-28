import { IonDatetime } from '@ionic/angular';
import { OutStockModel } from './OutStockModel';

export class VendorChallanModel {
    public VendorChallanNo: number;
    public VendorChallanNumber: string;
    public VendorChallanDate: any;
    public CreateDate: any;
    public EditDate: any;
    public OutStocks: OutStockModel[];

    public outputQuantity: number;
    public IsNg: boolean;
}
