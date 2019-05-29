import { Routes } from '@angular/router';
import { MembersListComponent } from '../components/members-list/members-list.component';

export const routes: Routes = [
  {path: 'members', component: MembersListComponent},
  {path: '', redirectTo: '/members', pathMatch: 'full'}
];
