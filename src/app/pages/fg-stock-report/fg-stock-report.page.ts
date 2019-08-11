import { Component, OnInit } from '@angular/core';
import { FGAndSemiStockReportModel } from 'src/app/models/FGAndSemiStockReportModel';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-fg-stock-report',
  templateUrl: './fg-stock-report.page.html',
  styleUrls: ['./fg-stock-report.page.scss'],
})
export class FgStockReportPage implements OnInit {
  public fgStockReportModelList: FGAndSemiStockReportModel[];
  public gridOptions: any;
  public columnDefs: any;
  public context: any;

  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    this.columnDefs = [
      { headerName: 'Output Code', field: 'Code', colId: 'Code' },
      { headerName: 'Output Material Description', field: 'Description', colId: 'Description' },
      { headerName: 'Output Quantity', field: 'Quantity', colId: 'Quantity' }
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
    this.generalService.getFGStockReport()
      .subscribe(
        result => {
          debugger;
          this.fgStockReportModelList = result;
        },
        error => {
          this.fgStockReportModelList = [];
          alert('Some error occurred while fetching details.');
        }
      );
  }

  public export() {
    var params = {};

    this.gridOptions.api.exportDataAsCsv(params);
  }
}
