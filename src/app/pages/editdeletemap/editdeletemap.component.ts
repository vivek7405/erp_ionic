import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editdeletemap',
  templateUrl: './editdeletemap.component.html',
  styleUrls: ['./editdeletemap.component.scss'],
})
export class EditdeletemapComponent implements OnInit {
  public params: any;

  constructor() { }

  ngOnInit() { }

  agInit(params: any): void {
    this.params = params;
  }

  public deleteRowAg() {
    this.params.context.deleteRowAg(this.params.node.data);
  }

  public editRowAg() {
    this.params.context.editRowAg(this.params.node.data);
  }

  public mapRowAg() {
    this.params.context.mapRowAg(this.params.node.data);
  }
}
