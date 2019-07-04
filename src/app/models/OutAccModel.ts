import { IonDatetime } from '@ionic/angular';
import { OutStockModel } from './OutStockModel';
import { AccChallanDeductionModel } from './AccChallanDeductionModel';
import { BASFChallanSelection } from './BASFChallanSelection';

export class OutAccModel {
    public OutAccId: number;
    public OutStockId: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ProductId: number;

    public OutStock: OutStockModel;
    public AccChallanDeductions: AccChallanDeductionModel[];

    public basfChallanSelection: BASFChallanSelection[];
    public isManual: boolean;
}
