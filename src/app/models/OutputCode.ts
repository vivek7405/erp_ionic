import { IonDatetime } from '@ionic/angular';

export class OutputCode {
    public OutputCodeId: number;
    public ProjectName: string;
    public OutputCodeNo: string;
    public OutputMaterialDesc: string;
    public OutputQuantity: number;
    public CreateDate?: IonDatetime;
    public EditDate?: IonDatetime;
}