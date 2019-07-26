import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  public params: any;

  constructor() { }

  ngOnInit() { }

  agInit(params: any): void {
    this.params = params;
  }

  public deleteRowAg() {
    this.params.context.deleteRowAg(this.params.node.data);
  }
}
