import { IonDatetime } from '@ionic/angular';
import { ChallanDeductionModel } from './ChallanDeductionModel';
import { BASFChallanSelection } from './BASFChallanSelection';
import { OutAccModel } from './OutAccModel';

export class OutStockModel {
  public OutStockId: number;
  public VendorChallanNo: number;
  public OutputQuantity: number;
  public CreateDate: IonDatetime;
  public EditDate: IonDatetime;
  public ProductId: number;
  public ChallanDeductions: ChallanDeductionModel[];

  public OutAccs: OutAccModel[] = [];

  public basfChallanSelection: BASFChallanSelection[];
  public isManual: boolean;

  public inputQntSum: number;
}
