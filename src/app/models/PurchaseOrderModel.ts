import { OutputCode } from './OutputCode';
import { InputCodeModel } from './InputCodeModel';

export class PurchaseOrderModel {
    public OutputCode: OutputCode;
    public InputCodes: InputCodeModel[];
}