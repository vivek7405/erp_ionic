import { InvoiceOutStockModel } from './InvoiceOutStockModel';

export class BASFInvoiceModel {
    public BASFInvoiceId: number;
    public BASFInvoiceNo: number;
    public BASFInvoiceDate: any;
    public CreateDate: any;
    public EditDate: any;
    public InvoiceOutStocks: InvoiceOutStockModel[];

    public outputQuantity: number;
    public IsNg: boolean;
}
