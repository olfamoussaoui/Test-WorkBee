import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Member } from 'src/app/classes/member';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/classes/team';
import { MemberDetails } from 'src/app/classes/memberdetails';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  teams: Team[];
  memberDet: MemberDetails;
  membersDetails: MemberDetails[] = [];
  public dataSource = new MatTableDataSource<MemberDetails>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['lastName', 'firstName', 'fullName', 'role'];
  constructor(private teamService: TeamService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      // retrieve the needed list of teams
      this.teams = teams
        .filter(t => t.members
          .some(members => members.role === 'Technical Lead' || members.role === 'Software Engineer')
        )
        .map(t => {
          const n = Object.assign({}, t, {
            members: t.members.filter(
              members => members.role === 'Technical Lead' || members.role === 'Software Engineer'
            )
          });
          return n;
        }).filter(t => t.state === 'VA');

      // retrieve the needed list of members
      this.teams.forEach(item =>
        item.members.forEach(m => {
          this.memberDet = new MemberDetails();
          this.memberDet.firstName = m.firstName;
          this.memberDet.lastName = m.lastName;
          this.memberDet.fullName = m.lastName + ' ' + m.firstName;
          this.memberDet.role = m.role;
          this.membersDetails.push(this.memberDet);
        }));
      this.dataSource.data = this.membersDetails;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  // Search function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
