import { PODetail } from './PODetail';
import { POProductModel } from './POProductModel';

export class ViewPODetailModel {
    public PODetail: PODetail;
    public POProducts: POProductModel[];

    public totalStockIn: number;
}