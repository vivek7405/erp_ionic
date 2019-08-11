import { IonDatetime } from '@ionic/angular';

export class ProductDetail {
    public ProductId: number;
    public ProductTypeId: number;
    public InputCode: string;
    public InputMaterialDesc: string;
    public OutputCode: string;
    public OutputMaterialDesc: string;
    public ProjectName: string;
    public SplitRatio: number;
    public CreateDate: any;
    public EditDate: any;

    public displayText: string;
}