import { ProductDetail } from './ProductDetail';
import { POProduct } from './POProduct';
import { PODetail } from './PODetail';
import { PODeduction } from './PODeduction';
import { AccPODeduction } from './AccPODeduction';
import { AssemblyPODeduction } from './AssemblyPODeduction';

export class POProductModel {
    public POProduct: POProduct;
    public ProductDetail: ProductDetail;
    public PODetail: PODetail;
    public PODeductions: PODeduction[];
    public AccPODeductions: AccPODeduction[];
    public AssemblyPODeductions: AssemblyPODeduction[];
    public RemainingQuantity: number;
    public CanDelete: boolean;
}
