export interface AdminDashboardMetrics {
  totalSales: number;
  averageTicket: number;
  paidOrders: number;
  pixConversion: number;
  pixTransactions: number;
  cardConversion: number;
  cardTransactions: number;
  chargebackConversion: number;
  chargebackTransactions: number;
  totalRevenue: number;
  pixRevenue: number;
  cardRevenue: number;
  availableBalance: number;
}

export interface ChartData {
  labels: string[];
  technology: number[];
  trip: number[];
}

export interface RecentActivity {
  id: string;
  type: 'kyc' | 'transaction' | 'withdrawal' | 'company';
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  amount?: number;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  color: string;
  count?: number;
}
