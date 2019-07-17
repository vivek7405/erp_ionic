import { IonDatetime } from '@ionic/angular';
import { ChallanDeductionModel } from './ChallanDeductionModel';
import { BASFChallanSelection } from './BASFChallanSelection';
import { OutAccModel } from './OutAccModel';
import { OutAssemblyModel } from './OutAssemblyModel';
import { BASFPOSelection } from './BASFPOSelection';
import { PODeductionModel } from './PODeductionModel';

export class OutStockModel {
  public OutStockId: number;
  public VendorChallanNo: number;
  public OutputQuantity: number;
  public CreateDate: IonDatetime;
  public EditDate: IonDatetime;
  public ProductId: number;
  public SplitRatio: number;
  public ChallanDeductions: ChallanDeductionModel[];
  public PODeductions: PODeductionModel[];

  public OutAccs: OutAccModel[] = [];
  public OutAssemblys: OutAssemblyModel[] = [];

  public basfChallanSelection: BASFChallanSelection[];
  public basfPOSelection: BASFPOSelection[];
  
  public isManual: boolean;
  public isManualPO: boolean;

  public mainQntSum: number;
  public assemblyQntSum: number;
  public accQntSum: number;
}
