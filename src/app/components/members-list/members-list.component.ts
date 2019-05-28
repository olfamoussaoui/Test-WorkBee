import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/classes/member';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  public dataSource = new MatTableDataSource<Member>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['lastName', 'firstName', 'fullName', 'role'];
  constructor() { }

  ngOnInit() {
  }

}
