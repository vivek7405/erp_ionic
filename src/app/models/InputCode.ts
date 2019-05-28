import { IonDatetime } from '@ionic/angular';

export class InputCode {
    public InputCodeId: number;
    public InputCodeNo: string;
    public InputMaterialDesc: string;
    public InputQuantity: number;
    public SplitQuantity: number;
    public PartTypeId: number;
    public BASFChallanNo: string;
    public CreateDate?: IonDatetime;
    public EditDate?: IonDatetime;
}