import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editdelete',
  templateUrl: './editdelete.component.html',
  styleUrls: ['./editdelete.component.scss'],
})
export class EditdeleteComponent implements OnInit {
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
}
