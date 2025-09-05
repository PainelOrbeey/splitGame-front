import { Component, type OnInit } from "@angular/core"
import type {
  BankAccount,
  ReceiverBalance,
  Transfer,
  Anticipation,
  ReceiverBankMetrics,
} from "../../interfaces/receiver-bank.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"

@Component({
  selector: "app-receiver-bank",
  templateUrl: "./receiver-bank.component.html",
  styleUrls: ["./receiver-bank.component.scss"],
        standalone: true,
        imports: [CommonModule, FormsModule,PaginationComponent, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class ReceiverBankComponent implements OnInit {
  // Data properties
  bankAccounts: BankAccount[] = []
  receiverBalance: ReceiverBalance = {
    totalBalance: 0,
    availableBalance: 0,
    blockedBalance: 0,
    pendingBalance: 0,
    lastUpdate: new Date(),
  }
  transfers: Transfer[] = []
  anticipations: Anticipation[] = []
  metrics: ReceiverBankMetrics = {
    totalAccounts: 0,
    activeAccounts: 0,
    totalBalance: 0,
    monthlyTransfers: 0,
    pendingAnticipations: 0,
    totalAnticipated: 0,
  }

  // Dialog states
  addAccountDialogVisible = false
  balanceDialogVisible = false
  transferDialogVisible = false
  anticipationDialogVisible = false
  sidebarVisible = false

  // Form data
  newAccount: Partial<BankAccount> = {}
  newTransfer: Partial<Transfer> = {}
  newAnticipation: Partial<Anticipation> = {}

  // Filters and pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0
  filters = {
    search: "",
    status: "",
    paymentMethod: "",
    acquirer: "",
    priority: "",
    minAmount: null as number | null,
    maxAmount: null as number | null,
    customer: "",
    reference: "",
    period: "all",
    dateFrom: "",
    dateTo: "",
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.loadBankAccounts()
    this.loadBalance()
    this.loadTransfers()
    this.loadAnticipations()
    this.updateMetrics()
  }

  loadBankAccounts() {
    // Simulated data
    this.bankAccounts = [
      {
        id: "1",
        accountNumber: "12345-6",
        agency: "1234",
        bank: "Banco do Brasil",
        bankCode: "001",
        accountType: "checking",
        balance: 150000.0,
        status: "active",
        isDefault: true,
        createdAt: new Date("2024-01-15"),
        lastTransaction: new Date("2024-12-04"),
      },
      {
        id: "2",
        accountNumber: "98765-4",
        agency: "5678",
        bank: "Itaú",
        bankCode: "341",
        accountType: "checking",
        balance: 75000.0,
        status: "active",
        isDefault: false,
        createdAt: new Date("2024-02-20"),
        lastTransaction: new Date("2024-12-03"),
      },
      {
        id: "3",
        accountNumber: "55555-1",
        agency: "9999",
        bank: "Bradesco",
        bankCode: "237",
        accountType: "savings",
        balance: 25000.0,
        status: "inactive",
        isDefault: false,
        createdAt: new Date("2024-03-10"),
      },
      {
        id: "4",
        accountNumber: "77777-8",
        agency: "2222",
        bank: "Santander",
        bankCode: "033",
        accountType: "checking",
        balance: 90000.0,
        status: "active",
        isDefault: false,
        createdAt: new Date("2024-04-05"),
        lastTransaction: new Date("2024-12-02"),
      },
    ]
  }

  loadBalance() {
    const totalBalance = this.bankAccounts.reduce((sum, account) => sum + account.balance, 0)
    this.receiverBalance = {
      totalBalance: totalBalance,
      availableBalance: totalBalance * 0.85,
      blockedBalance: totalBalance * 0.1,
      pendingBalance: totalBalance * 0.05,
      lastUpdate: new Date(),
    }
  }

  loadTransfers() {
    this.transfers = [
      {
        id: "1",
        fromAccount: "Banco do Brasil - 12345-6",
        toAccount: "Itaú - 98765-4",
        amount: 5000.0,
        description: "Transferência para reserva",
        status: "completed",
        type: "internal",
        fee: 0,
        createdAt: new Date("2024-12-04"),
        completedAt: new Date("2024-12-04"),
        reference: "TRF001",
        priority: "normal",
        acquirer: "Stone",
        customer: "João Silva",
      },
      {
        id: "2",
        fromAccount: "Banco do Brasil - 12345-6",
        toAccount: "Banco Externo",
        amount: 10000.0,
        description: "Pagamento fornecedor",
        status: "pending",
        type: "ted",
        fee: 15.0,
        createdAt: new Date("2024-12-04"),
        reference: "TRF002",
        priority: "high",
        acquirer: "Cielo",
        customer: "Maria Santos",
      },
      {
        id: "3",
        fromAccount: "Itaú - 98765-4",
        toAccount: "Bradesco - 55555-1",
        amount: 2500.0,
        description: "Transferência PIX",
        status: "processing",
        type: "pix",
        fee: 0,
        createdAt: new Date("2024-12-03"),
        reference: "TRF003",
        priority: "urgent",
        acquirer: "PagSeguro",
        customer: "Carlos Oliveira",
      },
    ]
    this.totalItems = this.transfers.length
  }

  loadAnticipations() {
    this.anticipations = [
      {
        id: "1",
        accountId: "1",
        requestedAmount: 50000.0,
        approvedAmount: 45000.0,
        fee: 5000.0,
        feePercentage: 10,
        status: "approved",
        requestDate: new Date("2024-12-01"),
        paymentDate: new Date("2024-12-02"),
        dueDate: new Date("2024-12-30"),
        description: "Antecipação para capital de giro",
        reference: "ANT001",
        priority: "high",
        customer: "Empresa ABC",
      },
      {
        id: "2",
        accountId: "1",
        requestedAmount: 30000.0,
        approvedAmount: 0,
        fee: 0,
        feePercentage: 12,
        status: "pending",
        requestDate: new Date("2024-12-04"),
        dueDate: new Date("2025-01-15"),
        description: "Antecipação emergencial",
        reference: "ANT002",
        priority: "urgent",
        customer: "Empresa XYZ",
      },
      {
        id: "3",
        accountId: "2",
        requestedAmount: 15000.0,
        approvedAmount: 13500.0,
        fee: 1500.0,
        feePercentage: 10,
        status: "paid",
        requestDate: new Date("2024-11-28"),
        paymentDate: new Date("2024-11-29"),
        dueDate: new Date("2024-12-28"),
        description: "Antecipação de recebíveis",
        reference: "ANT003",
        priority: "normal",
        customer: "Loja 123",
      },
    ]
  }

  updateMetrics() {
    this.metrics = {
      totalAccounts: this.bankAccounts.length,
      activeAccounts: this.bankAccounts.filter((acc) => acc.status === "active").length,
      totalBalance: this.receiverBalance.totalBalance,
      monthlyTransfers: this.transfers.filter((t) => t.status === "completed").length,
      pendingAnticipations: this.anticipations.filter((a) => a.status === "pending").length,
      totalAnticipated: this.anticipations
        .filter((a) => a.status === "approved" || a.status === "paid")
        .reduce((sum, a) => sum + a.approvedAmount, 0),
    }
  }

  // Filter methods
  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    // Apply filters logic here
    this.currentPage = 1
    // In a real app, this would filter the data
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      paymentMethod: "",
      acquirer: "",
      priority: "",
      minAmount: null,
      maxAmount: null,
      customer: "",
      reference: "",
      period: "all",
      dateFrom: "",
      dateTo: "",
    }
    this.applyFilters()
  }

  exportCSV() {
    // Export logic here
    console.log("Exporting CSV...")
  }

  // Dialog actions
  openAddAccountDialog() {
    this.newAccount = {
      accountType: "checking",
      status: "active",
      isDefault: false,
    }
    this.addAccountDialogVisible = true
  }

  openBalanceDialog() {
    this.balanceDialogVisible = true
  }

  openTransferDialog() {
    this.newTransfer = {
      type: "internal",
      fee: 0,
      priority: "normal",
    }
    this.transferDialogVisible = true
  }

  openAnticipationDialog() {
    this.newAnticipation = {
      feePercentage: 10,
      status: "pending",
      priority: "normal",
    }
    this.anticipationDialogVisible = true
  }

  // Form submissions
  saveAccount() {
    if (this.newAccount.accountNumber && this.newAccount.agency && this.newAccount.bank) {
      const account: BankAccount = {
        id: Date.now().toString(),
        accountNumber: this.newAccount.accountNumber!,
        agency: this.newAccount.agency!,
        bank: this.newAccount.bank!,
        bankCode: this.newAccount.bankCode || "000",
        accountType: this.newAccount.accountType || "checking",
        balance: 0,
        status: this.newAccount.status || "active",
        isDefault: this.newAccount.isDefault || false,
        createdAt: new Date(),
      }

      this.bankAccounts.push(account)
      this.addAccountDialogVisible = false
      this.updateMetrics()
    }
  }

  saveTransfer() {
    if (this.newTransfer.amount && this.newTransfer.toAccount) {
      const transfer: Transfer = {
        id: Date.now().toString(),
        fromAccount: this.newTransfer.fromAccount || "Conta Principal",
        toAccount: this.newTransfer.toAccount!,
        amount: this.newTransfer.amount!,
        description: this.newTransfer.description || "",
        status: "pending",
        type: this.newTransfer.type || "internal",
        fee: this.newTransfer.fee || 0,
        createdAt: new Date(),
        reference: `TRF${Date.now()}`,
        priority: this.newTransfer.priority || "normal",
        acquirer: this.newTransfer.acquirer,
        customer: this.newTransfer.customer,
      }

      this.transfers.unshift(transfer)
      this.transferDialogVisible = false
      this.updateMetrics()
    }
  }

  saveAnticipation() {
    if (this.newAnticipation.requestedAmount && this.newAnticipation.accountId) {
      const anticipation: Anticipation = {
        id: Date.now().toString(),
        accountId: this.newAnticipation.accountId!,
        requestedAmount: this.newAnticipation.requestedAmount!,
        approvedAmount: 0,
        fee: 0,
        feePercentage: this.newAnticipation.feePercentage || 10,
        status: "pending",
        requestDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        description: this.newAnticipation.description || "",
        reference: `ANT${Date.now()}`,
        priority: this.newAnticipation.priority || "normal",
        customer: this.newAnticipation.customer,
      }

      this.anticipations.unshift(anticipation)
      this.anticipationDialogVisible = false
      this.updateMetrics()
    }
  }

  // Utility methods
  fmt(value: number, type = "currency"): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }
    return value.toString()
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      active: "tag-success",
      inactive: "tag-warning",
      blocked: "tag-danger",
      pending: "tag-warning",
      processing: "tag-info",
      completed: "tag-success",
      received: "tag-success",
      failed: "tag-danger",
      cancelled: "tag-secondary",
      approved: "tag-success",
      rejected: "tag-danger",
      paid: "tag-info",
    }
    return classes[status] || "tag-secondary"
  }

  getPriorityClass(priority: string): string {
    const classes: { [key: string]: string } = {
      low: "priority-low",
      normal: "priority-normal",
      high: "priority-high",
      urgent: "priority-urgent",
    }
    return classes[priority] || "priority-normal"
  }

  get filteredBankAccounts(): BankAccount[] {
    let filtered = [...this.bankAccounts]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (account) =>
          account.bank.toLowerCase().includes(search) ||
          account.accountNumber.toLowerCase().includes(search) ||
          account.agency.toLowerCase().includes(search),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((account) => account.status === this.filters.status)
    }

    return filtered
  }

  get paginatedTransfers(): Transfer[] {
    let filtered = [...this.transfers]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (transfer) =>
          transfer.reference.toLowerCase().includes(search) ||
          transfer.fromAccount.toLowerCase().includes(search) ||
          transfer.toAccount.toLowerCase().includes(search) ||
          (transfer.customer && transfer.customer.toLowerCase().includes(search)),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((transfer) => transfer.status === this.filters.status)
    }

    if (this.filters.paymentMethod) {
      filtered = filtered.filter((transfer) => transfer.type === this.filters.paymentMethod)
    }

    if (this.filters.acquirer) {
      filtered = filtered.filter((transfer) => transfer.acquirer === this.filters.acquirer)
    }

    if (this.filters.priority) {
      filtered = filtered.filter((transfer) => transfer.priority === this.filters.priority)
    }

    if (this.filters.minAmount) {
      filtered = filtered.filter((transfer) => transfer.amount >= this.filters.minAmount!)
    }

    if (this.filters.maxAmount) {
      filtered = filtered.filter((transfer) => transfer.amount <= this.filters.maxAmount!)
    }

    const start = (this.currentPage - 1) * this.itemsPerPage
    return filtered.slice(start, start + this.itemsPerPage)
  }

  get paginatedAnticipations(): Anticipation[] {
    let filtered = [...this.anticipations]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (anticipation) =>
          anticipation.reference.toLowerCase().includes(search) ||
          (anticipation.customer && anticipation.customer.toLowerCase().includes(search)),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((anticipation) => anticipation.status === this.filters.status)
    }

    if (this.filters.priority) {
      filtered = filtered.filter((anticipation) => anticipation.priority === this.filters.priority)
    }

    const start = (this.currentPage - 1) * this.itemsPerPage
    return filtered.slice(start, start + this.itemsPerPage)
  }

  onPageChange(page: number) {
    this.currentPage = page
  }

  refreshBalance() {
    this.loadBalance()
  }

  setAccountAsDefault(accountId: string) {
    this.bankAccounts.forEach((account) => {
      account.isDefault = account.id === accountId
    })
  }

  toggleAccountStatus(accountId: string) {
    const account = this.bankAccounts.find((acc) => acc.id === accountId)
    if (account) {
      account.status = account.status === "active" ? "inactive" : "active"
      this.updateMetrics()
    }
  }
}
