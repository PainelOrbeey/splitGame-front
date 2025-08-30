import { Routes } from '@angular/router';
import { HomeComponent } from './homeModule/components/home/home.component';
import { AdminDashboardComponent } from './adminModule/adminDashboardModule/components/admin-dashboard/admin-dashboard.component';
import { KycRequestsComponent } from './adminModule/kycRequestsModule/components/kyc-requests/kyc-requests.component';
import { CompaniesManagementComponent } from './adminModule/companiesModule/components/companies-management/companies-management.component';
import { TransactionsManagementComponent } from './adminModule/transactionsModule/components/transactions-management/transactions-management.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'kyc-requests', component: KycRequestsComponent },
      { path: 'all-companies', component: CompaniesManagementComponent },
      { path: 'all-transactions', component: TransactionsManagementComponent },

    ]
  },
  { path: '**', redirectTo: 'home/dashboard' }
];
