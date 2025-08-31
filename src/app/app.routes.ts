import { Routes } from '@angular/router';
import { HomeComponent } from './homeModule/components/home/home.component';
import { AdminDashboardComponent } from './adminModule/adminDashboardModule/components/admin-dashboard/admin-dashboard.component';
import { KycRequestsComponent } from './adminModule/kycRequestsModule/components/kyc-requests/kyc-requests.component';
import { CompaniesManagementComponent } from './adminModule/companiesModule/components/companies-management/companies-management.component';
import { TransactionsManagementComponent } from './adminModule/transactionsModule/components/transactions-management/transactions-management.component';
import { WithdrawalsManagementComponent } from './adminModule/withdrawalsModule/components/withdrawals-management/withdrawals-management.component';
import { AdvancesManagementComponent } from './adminModule/advancesModule/components/advances-management/advances-management.component';
import { CompanyRevenueComponent } from './adminModule/financialReportsModule/components/company-revenue/company-revenue.component';
import { PeriodRevenueComponent } from './adminModule/financialReportsModule/components/period-revenue/period-revenue.component';
import { CompanyProfitComponent } from './adminModule/financialReportsModule/components/company-profit/company-profit.component';
import { AcquirerRevenueComponent } from './adminModule/financialReportsModule/components/acquirer-revenue/acquirer-revenue.component';
import { WhiteLabelDashboardComponent } from './CompanyModule/whiteLabelDashboardModule/components/white-label-dashboard/white-label-dashboard.component';
import { WhiteLabelTransactionsComponent } from './CompanyModule/whiteLabelTransactionsModule/components/white-label-transactions/white-label-transactions.component';
import { WhiteLabelClientsComponent } from './CompanyModule/whiteLabelClientsModule/components/white-label-clients/white-label-clients.component';


export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'kyc-requests', component: KycRequestsComponent },
      { path: 'all-companies', component: CompaniesManagementComponent },
      { path: 'all-transactions', component: TransactionsManagementComponent },
      { path: 'all-withdrawals', component: WithdrawalsManagementComponent },
      { path: 'all-advances', component: AdvancesManagementComponent },
      { path: 'company-revenue', component: CompanyRevenueComponent },
      { path: 'company-period', component: PeriodRevenueComponent },
      { path: 'profit-company', component: CompanyProfitComponent },
      { path: 'acquirer-revenue', component: AcquirerRevenueComponent },

    ]
  },
  {
    path: 'company',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: WhiteLabelDashboardComponent },
      { path: 'transactions', component: WhiteLabelTransactionsComponent },
      { path: 'clients', component: WhiteLabelClientsComponent },

    ]
  },
  { path: '**', redirectTo: 'home/dashboard' }
];
