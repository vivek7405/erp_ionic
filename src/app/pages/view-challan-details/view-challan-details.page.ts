import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { ViewChallanDetailModel } from 'src/app/models/ViewChallanDetailModel';

@Component({
  selector: 'app-view-challan-details',
  templateUrl: './view-challan-details.page.html',
  styleUrls: ['./view-challan-details.page.scss'],
})
export class ViewChallanDetailsPage implements OnInit {
  public challanDetails: ViewChallanDetailModel[];

  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    this.getAllChallanDetails();
  }

  public getAllChallanDetails() {
    this.generalService.getAllChallanDetails()
      .subscribe(
        result => {
          debugger;
          this.challanDetails = result;
        },
        error => {
          alert('Some error occurred while fetching details');
        }
      );
  }
}
