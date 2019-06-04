import { IonDatetime } from '@ionic/angular';

export class ProductDetail {
    public ProductId: number;
    public InputCode: string;
    public ProductName: string;
    public SplitQuantity: number;
    public CreateDate: IonDatetime;
    public EditDate: IonDatetime;    
}