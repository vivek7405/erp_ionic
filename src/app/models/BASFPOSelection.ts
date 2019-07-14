import { ChallanDetail } from './ChallanDetail';
import { ChallanProduct } from './ChallanProduct';
import { PODetail } from './PODetail';
import { POProduct } from './POProduct';

export class BASFPOSelection {
    public PODetail: PODetail;
    public POProduct: POProduct;
    public InputQuantity?: number;
    public OutputQuantity?: number;
    public RemainingQuantity: number;
    public IsChecked: boolean;

    public outQuantity: number;
    public qntAfterDeduction: number;
}
