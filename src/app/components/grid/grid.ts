import {Component, EventEmitter} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Column} from './column';
import {Sorter} from './sorter';

@Component({
  selector: 'grid',
  templateUrl: 'assets/views/grid.html',
  directives: [NgFor],
  inputs: ['rows: rows', 'columns: columns'],
  outputs: ['action']
})

export class Grid {

  action: EventEmitter<any> = new EventEmitter();

  columns: Array<Column>;
  rows: Array<any>;

  sorter = new Sorter();

  sort(key) {
    this.sorter.sort(key, this.rows);
  }

  onClick(object: any) {
    this.action.emit(object);
  }
}
