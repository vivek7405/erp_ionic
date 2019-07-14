export class ProductQuantity {
    public ProductId: number;
    public ProductName: string;
    public RemainingQuantity: number;
    public RemainingQuantityPO: number;

    public totalOutQnt: number;     // Used for checking if out quantity exceeds remaining quantity

    public AssemblyProductQnts: ProductQuantity[];    
}
