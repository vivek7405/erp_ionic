import { IonDatetime } from '@ionic/angular';
import { ProductDetail } from './ProductDetail';

export class ChallanProduct {
    public ChallanProductId: number;
    public ChallanId: number;
    public ProductId: number;
    public InputQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;

    public CanDelete: boolean;
    public selectedProductDetail: ProductDetail;
}