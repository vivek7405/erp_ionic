import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { FGAndSemiStockReportModel } from 'src/app/models/FGAndSemiStockReportModel';

@Component({
  selector: 'app-semi-stock-report',
  templateUrl: './semi-stock-report.page.html',
  styleUrls: ['./semi-stock-report.page.scss'],
})
export class SemiStockReportPage implements OnInit {
  public semiStockReportModelList: FGAndSemiStockReportModel[];
  public gridOptions: any;
  public columnDefs: any;
  public context: any;

  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Input Code', field: 'Code', colId: 'Code' },
      { headerName: 'Input Material Description', field: 'Description', colId: 'Description' },
      { headerName: 'Remaining Quantity', field: 'Quantity', colId: 'Quantity' }
    ];

    this.gridOptions = {
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true
      },
      pagination: true,
      paginationAutoPageSize: true
    };

    this.context = this;

    this.getFGStockReport();
  }

  public getFGStockReport() {
    this.generalService.getSemiStockReport()
      .subscribe(
        result => {
          debugger;
          this.semiStockReportModelList = result;
        },
        error => {
          this.semiStockReportModelList = [];
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
