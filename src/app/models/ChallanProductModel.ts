import { ChallanProduct } from './ChallanProduct';
import { ProductDetail } from './ProductDetail';
import { ChallanDeduction } from './ChallanDeduction';
import { ChallanDetail } from './ChallanDetail';
import { AccChallanDeduction } from './AccChallanDeduction';

export class ChallanProductModel {
    public ChallanProduct: ChallanProduct;
    public ProductDetail: ProductDetail;
    public ChallanDetail: ChallanDetail;
    public ChallanDeductions: ChallanDeduction[];
    public AccChallanDeductions: AccChallanDeduction[];
    public RemainingQuantity: number;
}
