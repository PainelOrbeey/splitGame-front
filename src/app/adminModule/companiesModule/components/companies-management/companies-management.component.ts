import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Company, CompanyFilters, CompanyMetrics } from "../../interfaces/company.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { Router } from "@angular/router"
import { ImpersonationService } from "../../../../../shared/services/impersonation.service"

@Component({
  selector: "app-companies-management",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent,PaginationComponent, SidebarFiltersComponent, CustomDialogComponent],
  templateUrl: "./companies-management.component.html",
  styleUrls: ["./companies-management.component.scss"],
})
export class CompaniesManagementComponent implements OnInit {
  companies: Company[] = []
  filteredCompanies: Company[] = []
  selectedCompany: Company | null = null
  sidebarVisible = false
  companyDialogVisible = false
  editCompanyDialogVisible = false
  editCompanyData: any = {}

  // New dialog states
  feesDialogVisible = false
  permissionsDialogVisible = false
  financialReservesDialogVisible = false
  acquirerDialogVisible = false
  baasDialogVisible = false
  subaccountDialogVisible = false

  // Current editing section
  currentEditSection = ""

  filters: CompanyFilters = {
    search: "",
    status: "",
    kycStatus: "",
    category: "",
    minRevenue: null,
    maxRevenue: null,
    minEmployees: null,
    maxEmployees: null,
    state: "",
    dateFrom: "",
    dateTo: "",
    minVolume: null,
    maxVolume: null,
  }

  metrics: CompanyMetrics = {
    totalCompanies: 0,
    activeCompanies: 0,
    pendingKyc: 0,
    totalRevenue: 0,
    averageRevenue: 0,
    conversionRate: 0,
  }

  // Pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  // Company fees data
  companyFees = {
    cardFees: {
      fixedFee: 1.99,
      installments: {
        "1x": 7.49,
        "2x": 10.0,
        "3x": 12.5,
        "4x": 15.0,
        "5x": 16.99,
        "6x": 18.49,
        "7x": 19.79,
        "8x": 20.99,
        "9x": 22.49,
        "10x": 23.79,
        "11x": 24.99,
        "12x": 26.49,
      },
    },
    pixFees: {
      fixedFee: 1.0,
      variableFee: 7.0,
    },
    boletoFees: {
      fixedFee: 1.99,
      variableFee: 2.49,
    },
    transferRules: {
      enabled: true,
      validation: true,
      maxAmount: 5000,
    },
  }

  // Company permissions
  companyPermissions = {
    paymentMethods: {
      creditCard: true,
      debitCard: true,
      pix: true,
      boleto: true,
    },
    features: {
      transfers: true,
      withdrawals: true,
      reports: true,
      api: true,
    },
    limits: {
      dailyLimit: 50000,
      monthlyLimit: 1000000,
      transactionLimit: 10000,
    },
  }

  // Financial reserves
  financialReserves = {
    currentReserve: 25000,
    minimumReserve: 10000,
    reservePercentage: 5,
    autoReserve: true,
    reserveHistory: [
      { date: new Date("2024-01-15"), amount: 5000, type: "addition", reason: "Ajuste automático" },
      { date: new Date("2024-01-10"), amount: -2000, type: "deduction", reason: "Chargeback" },
    ],
  }

  // Acquirer settings
  acquirerSettings = {
    currentAcquirer: "stone",
    availableAcquirers: [
      { id: "stone", name: "Stone", status: "active" },
      { id: "cielo", name: "Cielo", status: "available" },
      { id: "rede", name: "Rede", status: "available" },
      { id: "getnet", name: "Getnet", status: "available" },
    ],
    acquirerConfig: {
      merchantId: "123456789",
      apiKey: "***************",
      environment: "production",
    },
  }

  // BaaS settings
  baasSettings = {
    currentProvider: "dock",
    availableProviders: [
      { id: "dock", name: "Dock", status: "active" },
      { id: "qitech", name: "QI Tech", status: "available" },
      { id: "bankly", name: "Bankly", status: "available" },
    ],
    baasConfig: {
      accountId: "ACC123456",
      apiEndpoint: "https://api.dock.tech",
      webhookUrl: "https://webhook.empresa.com",
    },
  }

  // Subaccount data
  subaccountData = {
    accountNumber: "12345-6",
    agency: "0001",
    balance: 15750.5,
    status: "active",
    transactions: [
      { id: "1", date: new Date(), type: "credit", amount: 1500, description: "Venda PIX" },
      { id: "2", date: new Date(), type: "debit", amount: -50, description: "Taxa de transferência" },
    ],
  }

constructor(
  private router: Router,
  private impersonation: ImpersonationService
) {}
  ngOnInit() {
    this.loadCompanies()
    this.updateMetrics()
  }

  loadCompanies() {
    // Mock data
    this.companies = [
      {
        id: "1",
        name: "Tech Solutions Ltda",
        cnpj: "12.345.678/0001-90",
        email: "contato@techsolutions.com",
        phone: "(11) 99999-9999",
        status: "active",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
        totalRevenue: 150000,
        totalTransactions: 245,
        kycStatus: "approved",
        category: "Tecnologia",
        employees: 25,
        monthlyVolume: 50000,
        address: {
          street: "Rua das Flores",
          number: "123",
          city: "São Paulo",
          state: "SP",
          zipCode: "01234-567",
        },
        representative: {
          name: "João Silva",
          email: "joao@techsolutions.com",
          phone: "(11) 88888-8888",
          cpf: "123.456.789-00",
        },
      },
      {
        id: "2",
        name: "Inovação Digital S.A.",
        cnpj: "98.765.432/0001-10",
        email: "contato@inovacaodigital.com",
        phone: "(21) 77777-7777",
        status: "pending",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-18"),
        totalRevenue: 89000,
        totalTransactions: 156,
        kycStatus: "pending",
        category: "Marketing",
        employees: 15,
        monthlyVolume: 30000,
        address: {
          street: "Av. Paulista",
          number: "456",
          city: "Rio de Janeiro",
          state: "RJ",
          zipCode: "20000-000",
        },
        representative: {
          name: "Maria Santos",
          email: "maria@inovacaodigital.com",
          phone: "(21) 66666-6666",
          cpf: "987.654.321-00",
        },
      },
      {
        id: "3",
        name: "Comércio Brasil Ltda",
        cnpj: "11.222.333/0001-44",
        email: "vendas@comerciobrasil.com",
        phone: "(31) 55555-5555",
        status: "active",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-05"),
        totalRevenue: 200000,
        totalTransactions: 320,
        kycStatus: "approved",
        category: "Varejo",
        employees: 50,
        monthlyVolume: 75000,
        address: {
          street: "Rua do Comércio",
          number: "789",
          city: "Belo Horizonte",
          state: "MG",
          zipCode: "30000-000",
        },
        representative: {
          name: "Carlos Oliveira",
          email: "carlos@comerciobrasil.com",
          phone: "(31) 44444-4444",
          cpf: "111.222.333-44",
        },
      },
    ]

    this.applyFilters()
  }
impersonateAndGo(company: Company){
  this.impersonation.start(
    { id: company.id, name: company.name },
    { name: 'Admin Sistema', email: 'admin@sistema.com' } // opcional
  );
  this.router.navigate(['/company/dashboard']);
}

  updateMetrics() {
    const filtered = this.getFilteredCompanies()

    this.metrics = {
      totalCompanies: filtered.length,
      activeCompanies: filtered.filter((c) => c.status === "active").length,
      pendingKyc: filtered.filter((c) => c.kycStatus === "pending").length,
      totalRevenue: filtered.reduce((sum, c) => sum + c.totalRevenue, 0),
      averageRevenue: filtered.length > 0 ? filtered.reduce((sum, c) => sum + c.totalRevenue, 0) / filtered.length : 0,
      conversionRate:
        filtered.length > 0 ? (filtered.filter((c) => c.status === "active").length / filtered.length) * 100 : 0,
    }
  }

  getFilteredCompanies(): Company[] {
    return this.companies.filter((company) => {
      const matchesSearch =
        !this.filters.search ||
        company.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        company.cnpj.includes(this.filters.search) ||
        company.email.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || company.status === this.filters.status
      const matchesKyc = !this.filters.kycStatus || company.kycStatus === this.filters.kycStatus
      const matchesCategory = !this.filters.category || company.category === this.filters.category
      const matchesState = !this.filters.state || company.address.state === this.filters.state

      const matchesRevenue =
        (!this.filters.minRevenue || company.totalRevenue >= this.filters.minRevenue) &&
        (!this.filters.maxRevenue || company.totalRevenue <= this.filters.maxRevenue)

      const matchesEmployees =
        (!this.filters.minEmployees || company.employees >= this.filters.minEmployees) &&
        (!this.filters.maxEmployees || company.employees <= this.filters.maxEmployees)

      const matchesVolume =
        (!this.filters.minVolume || company.monthlyVolume >= this.filters.minVolume) &&
        (!this.filters.maxVolume || company.monthlyVolume <= this.filters.maxVolume)

      let matchesDate = true
      if (this.filters.dateFrom) {
        matchesDate = matchesDate && company.createdAt >= new Date(this.filters.dateFrom)
      }
      if (this.filters.dateTo) {
        matchesDate = matchesDate && company.createdAt <= new Date(this.filters.dateTo)
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesKyc &&
        matchesCategory &&
        matchesState &&
        matchesRevenue &&
        matchesEmployees &&
        matchesVolume &&
        matchesDate
      )
    })
  }

  applyFilters() {
    this.filteredCompanies = this.getFilteredCompanies()
    this.totalItems = this.filteredCompanies.length
    this.currentPage = 1
    this.updateMetrics()
  }

  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      kycStatus: "",
      category: "",
      minRevenue: null,
      maxRevenue: null,
      minEmployees: null,
      maxEmployees: null,
      state: "",
      dateFrom: "",
      dateTo: "",
      minVolume: null,
      maxVolume: null,
    }
    this.applyFilters()
  }

  exportCSV() {
    const csvData = this.filteredCompanies.map((company) => ({
      Nome: company.name,
      CNPJ: company.cnpj,
      Email: company.email,
      Status: company.status,
      KYC: company.kycStatus,
      Receita: this.fmt(company.totalRevenue, "currency"),
      Funcionários: company.employees,
      Categoria: company.category,
      Estado: company.address.state,
      "Criado em": company.createdAt.toLocaleDateString("pt-BR"),
    }))

    console.log("Exportando CSV:", csvData)
  }

  viewCompany(company: Company) {
    this.selectedCompany = company
    this.companyDialogVisible = true
  }

  editCompany(company: Company) {
    this.selectedCompany = company
    this.editCompanyData = {
      paymentMethods: {
        creditCard: true,
        boleto: true,
        pix: true,
      },
      security: {
        apiKeys: "***************",
        advancedSettings: false,
      },
      transferRules: {
        transferEnabled: true,
        transferValidation: true,
        sendForAnalysis: false,
      },
      fees: {
        fixedFee: 1.0,
        variableFee: 0.5,
        maxTransferValue: 5000,
      },
      cardFees: {
        fixedFee: 1.99,
        installments: {
          "1x": 7.49,
          "2x": 10.0,
          "3x": 12.5,
          "4x": 15.0,
          "5x": 16.99,
          "6x": 18.49,
          "7x": 19.79,
          "8x": 20.99,
          "9x": 22.49,
          "10x": 23.79,
          "11x": 24.99,
          "12x": 26.49,
        },
      },
      pixFees: {
        fixedFee: 1.0,
        variableFee: 7.0,
      },
      boletoFees: {
        fixedFee: 1.99,
        variableFee: 2.49,
      },
    }
    this.editCompanyDialogVisible = true
  }

  handleDialogAction(action: any) {
    if (action.id === "close") {
      this.companyDialogVisible = false
      this.selectedCompany = null
    }
  }

  handleEditDialogAction(action: any) {
    if (action.id === "close") {
      this.editCompanyDialogVisible = false
      this.selectedCompany = null
    } else if (action.id === "save") {
      // Save company changes
      console.log("Saving company changes:", this.editCompanyData)
      this.editCompanyDialogVisible = false
      this.selectedCompany = null
    }
  }

  // Handle edit option clicks
  handleEditOption(option: string) {
    this.currentEditSection = option

    switch (option) {
      case "fees":
        this.feesDialogVisible = true
        break
      case "permissions":
        this.permissionsDialogVisible = true
        break
      case "reserves":
        this.financialReservesDialogVisible = true
        break
      case "acquirer":
        this.acquirerDialogVisible = true
        break
      case "baas":
        this.baasDialogVisible = true
        break
      case "subaccount":
        this.subaccountDialogVisible = true
        break
    }
  }

  // Handle fees dialog actions
  handleFeesDialogAction(action: any) {
    if (action.id === "save") {
      console.log("Saving fees:", this.companyFees)
      this.feesDialogVisible = false
    } else if (action.id === "close") {
      this.feesDialogVisible = false
    }
  }

  // Handle permissions dialog actions
  handlePermissionsDialogAction(action: any) {
    if (action.id === "save") {
      console.log("Saving permissions:", this.companyPermissions)
      this.permissionsDialogVisible = false
    } else if (action.id === "close") {
      this.permissionsDialogVisible = false
    }
  }

  // Handle financial reserves dialog actions
  handleFinancialReservesDialogAction(action: any) {
    if (action.id === "save") {
      console.log("Saving financial reserves:", this.financialReserves)
      this.financialReservesDialogVisible = false
    } else if (action.id === "close") {
      this.financialReservesDialogVisible = false
    }
  }

  // Handle acquirer dialog actions
  handleAcquirerDialogAction(action: any) {
    if (action.id === "save") {
      console.log("Saving acquirer settings:", this.acquirerSettings)
      this.acquirerDialogVisible = false
    } else if (action.id === "close") {
      this.acquirerDialogVisible = false
    }
  }

  // Handle BaaS dialog actions
  handleBaasDialogAction(action: any) {
    if (action.id === "save") {
      console.log("Saving BaaS settings:", this.baasSettings)
      this.baasDialogVisible = false
    } else if (action.id === "close") {
      this.baasDialogVisible = false
    }
  }

  // Handle subaccount dialog actions
  handleSubaccountDialogAction(action: any) {
    if (action.id === "close") {
      this.subaccountDialogVisible = false
    }
  }

  // Change acquirer
  changeAcquirer(acquirerId: string) {
    this.acquirerSettings.currentAcquirer = acquirerId
    this.acquirerSettings.availableAcquirers.forEach((acq) => {
      acq.status = acq.id === acquirerId ? "active" : "available"
    })
  }

  // Change BaaS provider
  changeBaasProvider(providerId: string) {
    this.baasSettings.currentProvider = providerId
    this.baasSettings.availableProviders.forEach((provider) => {
      provider.status = provider.id === providerId ? "active" : "available"
    })
  }

  // Add financial reserve
  addFinancialReserve(amount: number, reason: string) {
    this.financialReserves.reserveHistory.unshift({
      date: new Date(),
      amount: amount,
      type: amount > 0 ? "addition" : "deduction",
      reason: reason,
    })
    this.financialReserves.currentReserve += amount
  }

  fmt(value: number, type: "int" | "currency" | "percent" = "int", min = 0, max = 0): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }

    if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value / 100)
    }

    return new Intl.NumberFormat("pt-BR").format(value)
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      active: "status-active",
      inactive: "status-inactive",
      pending: "status-pending",
      blocked: "status-blocked",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  getKycStatusClass(status: string): string {
    const statusClasses = {
      approved: "kyc-approved",
      pending: "kyc-pending",
      rejected: "kyc-rejected",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  onPageChange(page: number) {
    this.currentPage = page
  }

  get paginatedCompanies() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredCompanies.slice(start, end)
  }

  // Getters for template performance
  get currentAcquirerName(): string {
    return (
      this.acquirerSettings.availableAcquirers.find((a) => a.id === this.acquirerSettings.currentAcquirer)?.name || ""
    )
  }

  get currentBaasProviderName(): string {
    return this.baasSettings.availableProviders.find((p) => p.id === this.baasSettings.currentProvider)?.name || ""
  }

  get cardFeesEntries(): Array<{ key: string; value: number }> {
    return Object.entries(this.companyFees.cardFees.installments).map(([key, value]) => ({ key, value }))
  }
}
