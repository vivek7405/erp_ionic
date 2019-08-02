import { ChallanProduct } from './ChallanProduct';
import { ChallanDeduction } from './ChallanDeduction';
import { ChallanDetail } from './ChallanDetail';
import { AccChallanDeduction } from './AccChallanDeduction';
import { AssemblyChallanDeduction } from './AssemblyChallanDeduction';
import { ProductDetailWithProductType } from './ProductDetailWithProductType';

export class ChallanProductModel {
    public ChallanProduct: ChallanProduct;
    public ProductDetail: ProductDetailWithProductType;
    public ChallanDetail: ChallanDetail;
    public ChallanDeductions: ChallanDeduction[];
    public AccChallanDeductions: AccChallanDeduction[];
    public AssemblyChallanDeductions: AssemblyChallanDeduction[];
    public RemainingQuantity: number;
    public CanDelete: boolean;
}
