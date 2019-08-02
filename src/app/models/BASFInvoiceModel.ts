import { InvoiceOutStockModel } from './InvoiceOutStockModel';

export class BASFInvoiceModel {
    public BASFInvoiceId: number;
    public BASFInvoiceNo: string;
    public BASFInvoiceDate: any;
    public CreateDate: any;
    public EditDate: any;
    public InvoiceOutStocks: InvoiceOutStockModel[];

    public outputQuantity: number;
    public IsNg: boolean;
}
