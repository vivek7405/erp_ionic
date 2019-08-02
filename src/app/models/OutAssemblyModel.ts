import { IonDatetime } from '@ionic/angular';
import { OutStockModel } from './OutStockModel';
import { BASFChallanSelection } from './BASFChallanSelection';
import { AssemblyChallanDeductionModel } from './AssemblyChallanDeductionModel';
import { AssemblyPODeductionModel } from './AssemblyPODeductionModel';
import { BASFPOSelection } from './BASFPOSelection';
import { ProductQuantity } from './ProductQuantity';

export class OutAssemblyModel {
    public OutAssemblyId: number;
    public OutStockId: number;
    public OutputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public ProductId: number;
    public SplitRatio: number;

    public OutStock: OutStockModel;
    public AssemblyChallanDeductions: AssemblyChallanDeductionModel[];
    public AssemblyPODeductions: AssemblyPODeductionModel[];

    public basfChallanSelection: BASFChallanSelection[];
    public basfPOSelection: BASFPOSelection[];

    public isManual: boolean;
    public isManualPO: boolean;

    public productAssemblyQnts: ProductQuantity[];
    public selectedProductAssemblyQnt: ProductQuantity;

    public assemblyQntSum: number;
}
