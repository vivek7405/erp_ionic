import { ChallanDetail } from './ChallanDetail';
import { ChallanProduct } from './ChallanProduct';

export class BASFChallanSelection {
    public ChallanDetail: ChallanDetail;
    public ChallanProduct: ChallanProduct;
    public InputQuantity?: number;
    public OutputQuantity?: number;
    public RemainingQuantity: number;
    public IsChecked: boolean;

    public outQuantity: number;
    public qntAfterDeduction: number;
}
