import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Acquirer, AcquirerFilters, AcquirerMetrics } from "../../interfaces/acquirer.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-acquirers-management",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserMenuComponent,
    SummaryCardComponent,
    FilterTabsComponent,
    SidebarFiltersComponent,
    PaginationComponent,
    CustomDialogComponent,
  ],
  templateUrl: "./acquirers-management.component.html",
  styleUrls: ["./acquirers-management.component.scss"],
})
export class AcquirersManagementComponent implements OnInit {
  // View state
  sidebarVisible = false
  acquirerDetailVisible = false
  configDialogVisible = false
  addAcquirerVisible = false
  currentPage = 1
  readonly itemsPerPage = 8

  // Selected acquirer
  selectedAcquirer: Acquirer | null = null
  editConfig: any = {}
  newAcquirer: Partial<Acquirer> = {}

  // Filters
  filters: AcquirerFilters = {
    search: "",
    type: "",
    status: "",
    integration: "",
    environment: "",
    dateFrom: "",
    dateTo: "",
    minVolume: "",
    maxVolume: "",
  }

  // Metrics
  metrics: AcquirerMetrics = {
    totalAcquirers: { value: 8, delta: "+2", deltaType: "up" },
    activeAcquirers: { value: 7, delta: "+1", deltaType: "up" },
    totalVolume: { value: 2450000, delta: "+15.2%", deltaType: "up" },
    averageSuccessRate: { value: 98.5, delta: "+0.3%", deltaType: "up" },
    totalTransactions: { value: 45230, delta: "+8.7%", deltaType: "up" },
    averageResponseTime: { value: 1.2, delta: "-0.1s", deltaType: "up" },
    systemUptime: { value: 99.9, delta: "+0.1%", deltaType: "up" },
    errorRate: { value: 1.5, delta: "-0.3%", deltaType: "up" },
  }

  // Sample acquirers data based on the provided image
  acquirers: Acquirer[] = [
    {
      id: "1",
      name: "Pagora Fy (2)",
      logo: "/placeholder.svg?height=60&width=120&text=Pagora",
      type: "all",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v2.1",
      lastSync: new Date("2024-01-16T10:30:00"),
      createdAt: new Date("2025-08-28"),
      updatedAt: new Date("2024-01-16"),
      usingSince: new Date("2025-08-28"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "PAGORA_MERCHANT_123",
        apiKey: "pk_live_abc123...",
        secretKey: "sk_secret_xyz789...",
        webhookUrl: "https://api.orbeey.com/webhooks/pagora",
        callbackUrl: "https://api.orbeey.com/callbacks/pagora",
        timeout: 30000,
        retryAttempts: 3,
      },
      fees: {
        creditCard: 2.99,
        debitCard: 1.99,
        pix: 0.99,
        boleto: 3.49,
        installments: {
          2: 3.49,
          3: 3.99,
          6: 4.49,
          12: 5.99,
        },
      },
      metrics: {
        totalTransactions: 12450,
        totalVolume: 850000,
        successRate: 98.7,
        averageResponseTime: 1.1,
        monthlyTransactions: 3200,
        monthlyVolume: 245000,
        errorRate: 1.3,
        uptime: 99.9,
      },
      limits: {
        dailyLimit: 100000,
        monthlyLimit: 2000000,
        transactionLimit: 50000,
        minimumAmount: 1,
        maximumAmount: 50000,
      },
      support: {
        email: "suporte@pagora.com.br",
        phone: "(11) 3003-1234",
        documentation: "https://docs.pagora.com.br",
        status: "available",
      },
    },
    {
      id: "2",
      name: "Payzu",
      logo: "/placeholder.svg?height=60&width=120&text=Payzu",
      type: "all",
      status: "active",
      integration: "sdk",
      environment: "production",
      apiVersion: "v4.0",
      lastSync: new Date("2024-01-16T09:15:00"),
      createdAt: new Date("2025-08-18"),
      updatedAt: new Date("2024-01-16"),
      usingSince: new Date("2025-08-18"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "PAYZU_MERCHANT_456",
        apiKey: "pk_live_def456...",
        secretKey: "sk_secret_uvw012...",
        webhookUrl: "https://api.orbeey.com/webhooks/payzu",
        callbackUrl: "https://api.orbeey.com/callbacks/payzu",
        timeout: 25000,
        retryAttempts: 2,
      },
      fees: {
        creditCard: 3.19,
        debitCard: 2.19,
        pix: 0.99,
        boleto: 3.99,
        installments: {
          2: 3.69,
          3: 4.19,
          6: 4.69,
          12: 6.19,
        },
      },
      metrics: {
        totalTransactions: 8920,
        totalVolume: 620000,
        successRate: 97.8,
        averageResponseTime: 1.4,
        monthlyTransactions: 2100,
        monthlyVolume: 180000,
        errorRate: 2.2,
        uptime: 99.5,
      },
      limits: {
        dailyLimit: 80000,
        monthlyLimit: 1500000,
        transactionLimit: 30000,
        minimumAmount: 1,
        maximumAmount: 30000,
      },
      support: {
        email: "suporte@payzu.com.br",
        phone: "(11) 4003-4000",
        documentation: "https://dev.payzu.com.br",
        status: "available",
      },
    },
    {
      id: "3",
      name: "PAGNET",
      logo: "/placeholder.svg?height=60&width=120&text=PAGNET",
      type: "all",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v1.8",
      lastSync: new Date("2024-01-15T18:45:00"),
      createdAt: new Date("2025-08-18"),
      updatedAt: new Date("2024-01-15"),
      usingSince: new Date("2025-08-18"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "PAGNET_MERCHANT_789",
        apiKey: "APP_USR_ghi789...",
        secretKey: "sk_secret_rst345...",
        webhookUrl: "https://api.orbeey.com/webhooks/pagnet",
        callbackUrl: "https://api.orbeey.com/callbacks/pagnet",
        timeout: 20000,
        retryAttempts: 3,
      },
      fees: {
        creditCard: 2.89,
        debitCard: 1.89,
        pix: 0.99,
        boleto: 3.29,
        installments: {
          2: 3.39,
          3: 3.89,
          6: 4.39,
          12: 5.89,
        },
      },
      metrics: {
        totalTransactions: 15680,
        totalVolume: 980000,
        successRate: 99.1,
        averageResponseTime: 0.9,
        monthlyTransactions: 4200,
        monthlyVolume: 320000,
        errorRate: 0.9,
        uptime: 99.8,
      },
      limits: {
        dailyLimit: 120000,
        monthlyLimit: 2500000,
        transactionLimit: 60000,
        minimumAmount: 1,
        maximumAmount: 60000,
      },
      support: {
        email: "contato@fastsoftbrasil.com",
        phone: "(11) 4020-1234",
        documentation: "https://www.pagnet.com.br/developers",
        status: "available",
      },
    },
    {
      id: "4",
      name: "Pagora Fy",
      logo: "/placeholder.svg?height=60&width=120&text=Pagora",
      type: "all",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v3.0",
      lastSync: new Date("2024-01-16T11:20:00"),
      createdAt: new Date("2025-08-15"),
      updatedAt: new Date("2024-01-16"),
      usingSince: new Date("2025-08-15"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "PAGORA2_MERCHANT_101",
        apiKey: "pagora_live_key123...",
        secretKey: "pagora_secret_456...",
        webhookUrl: "https://api.orbeey.com/webhooks/pagora2",
        callbackUrl: "https://api.orbeey.com/callbacks/pagora2",
        timeout: 35000,
        retryAttempts: 3,
      },
      fees: {
        creditCard: 3.29,
        debitCard: 2.29,
        pix: 1.19,
        boleto: 3.79,
        installments: {
          2: 3.79,
          3: 4.29,
          6: 4.79,
          12: 6.29,
        },
      },
      metrics: {
        totalTransactions: 18500,
        totalVolume: 1200000,
        successRate: 98.9,
        averageResponseTime: 1.0,
        monthlyTransactions: 4800,
        monthlyVolume: 380000,
        errorRate: 1.1,
        uptime: 99.7,
      },
      limits: {
        dailyLimit: 150000,
        monthlyLimit: 3000000,
        transactionLimit: 75000,
        minimumAmount: 1,
        maximumAmount: 75000,
      },
      support: {
        email: "suporte@pagora.com.br",
        phone: "(11) 4002-5472",
        documentation: "https://docs.pagora.com.br",
        status: "available",
      },
    },
    {
      id: "5",
      name: "ReflowPay (11/08)",
      logo: "/placeholder.svg?height=60&width=120&text=Reflow",
      type: "all",
      status: "active",
      integration: "sdk",
      environment: "production",
      apiVersion: "v2.5",
      lastSync: new Date("2024-01-14T16:45:00"),
      createdAt: new Date("2025-08-11"),
      updatedAt: new Date("2024-01-14"),
      usingSince: new Date("2025-08-11"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: true,
      },
      config: {
        merchantId: "REFLOW_MERCHANT_202",
        apiKey: "reflow_live_key789...",
        secretKey: "reflow_secret_012...",
        webhookUrl: "https://api.orbeey.com/webhooks/reflow",
        callbackUrl: "https://api.orbeey.com/callbacks/reflow",
        timeout: 28000,
        retryAttempts: 2,
      },
      fees: {
        creditCard: 3.09,
        debitCard: 2.09,
        pix: 1.09,
        boleto: 3.59,
        installments: {
          2: 3.59,
          3: 4.09,
          6: 4.59,
          12: 6.09,
        },
      },
      metrics: {
        totalTransactions: 5200,
        totalVolume: 320000,
        successRate: 97.2,
        averageResponseTime: 1.3,
        monthlyTransactions: 1200,
        monthlyVolume: 85000,
        errorRate: 2.8,
        uptime: 98.9,
      },
      limits: {
        dailyLimit: 60000,
        monthlyLimit: 1200000,
        transactionLimit: 40000,
        minimumAmount: 1,
        maximumAmount: 40000,
      },
      support: {
        email: "suporte@reflowpay.com.br",
        phone: "(11) 3003-7373",
        documentation: "https://docs.reflowpay.com.br",
        status: "available",
      },
    },
    {
      id: "6",
      name: "Rapdyn",
      logo: "/placeholder.svg?height=60&width=120&text=Rapdyn",
      type: "pix",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v1.2",
      lastSync: new Date("2024-01-14T16:45:00"),
      createdAt: new Date("2025-08-01"),
      updatedAt: new Date("2024-01-14"),
      usingSince: new Date("2025-08-01"),
      paymentMethods: {
        pix: true,
        creditCard: false,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "RAPDYN_MERCHANT_303",
        apiKey: "rapdyn_live_key456...",
        secretKey: "rapdyn_secret_789...",
        webhookUrl: "https://api.orbeey.com/webhooks/rapdyn",
        callbackUrl: "https://api.orbeey.com/callbacks/rapdyn",
        timeout: 15000,
        retryAttempts: 2,
      },
      fees: {
        creditCard: 0,
        debitCard: 0,
        pix: 0.89,
        boleto: 0,
        installments: {},
      },
      metrics: {
        totalTransactions: 3200,
        totalVolume: 180000,
        successRate: 99.2,
        averageResponseTime: 0.8,
        monthlyTransactions: 800,
        monthlyVolume: 45000,
        errorRate: 0.8,
        uptime: 99.9,
      },
      limits: {
        dailyLimit: 50000,
        monthlyLimit: 800000,
        transactionLimit: 25000,
        minimumAmount: 1,
        maximumAmount: 25000,
      },
      support: {
        email: "suporte@rapdyn.com.br",
        phone: "(11) 2020-3030",
        documentation: "https://docs.rapdyn.com.br",
        status: "available",
      },
    },
    {
      id: "7",
      name: "MediusPag (30/07)",
      logo: "/placeholder.svg?height=60&width=120&text=Medius",
      type: "pix",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v1.5",
      lastSync: new Date("2024-01-14T16:45:00"),
      createdAt: new Date("2025-07-30"),
      updatedAt: new Date("2024-01-14"),
      usingSince: new Date("2025-07-30"),
      paymentMethods: {
        pix: true,
        creditCard: false,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "MEDIUS_MERCHANT_404",
        apiKey: "medius_live_key789...",
        secretKey: "medius_secret_012...",
        webhookUrl: "https://api.orbeey.com/webhooks/medius",
        callbackUrl: "https://api.orbeey.com/callbacks/medius",
        timeout: 20000,
        retryAttempts: 3,
      },
      fees: {
        creditCard: 0,
        debitCard: 0,
        pix: 0.79,
        boleto: 0,
        installments: {},
      },
      metrics: {
        totalTransactions: 2800,
        totalVolume: 150000,
        successRate: 98.8,
        averageResponseTime: 1.0,
        monthlyTransactions: 700,
        monthlyVolume: 38000,
        errorRate: 1.2,
        uptime: 99.5,
      },
      limits: {
        dailyLimit: 40000,
        monthlyLimit: 600000,
        transactionLimit: 20000,
        minimumAmount: 1,
        maximumAmount: 20000,
      },
      support: {
        email: "suporte@mediuspag.com.br",
        phone: "(11) 1010-2020",
        documentation: "https://docs.mediuspag.com.br",
        status: "available",
      },
    },
    {
      id: "8",
      name: "PixelPag",
      logo: "/placeholder.svg?height=60&width=120&text=Pixel",
      type: "all",
      status: "active",
      integration: "api",
      environment: "production",
      apiVersion: "v2.0",
      lastSync: new Date("2024-01-14T16:45:00"),
      createdAt: new Date("2025-07-25"),
      updatedAt: new Date("2024-01-14"),
      usingSince: new Date("2025-07-25"),
      paymentMethods: {
        pix: true,
        creditCard: true,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "PIXEL_MERCHANT_505",
        apiKey: "pixel_live_key012...",
        secretKey: "pixel_secret_345...",
        webhookUrl: "https://api.orbeey.com/webhooks/pixel",
        callbackUrl: "https://api.orbeey.com/callbacks/pixel",
        timeout: 25000,
        retryAttempts: 2,
      },
      fees: {
        creditCard: 2.79,
        debitCard: 1.79,
        pix: 0.69,
        boleto: 0,
        installments: {
          2: 3.29,
          3: 3.79,
          6: 4.29,
          12: 5.79,
        },
      },
      metrics: {
        totalTransactions: 6800,
        totalVolume: 420000,
        successRate: 98.5,
        averageResponseTime: 1.1,
        monthlyTransactions: 1700,
        monthlyVolume: 105000,
        errorRate: 1.5,
        uptime: 99.3,
      },
      limits: {
        dailyLimit: 80000,
        monthlyLimit: 1500000,
        transactionLimit: 40000,
        minimumAmount: 1,
        maximumAmount: 40000,
      },
      support: {
        email: "suporte@pixelpag.com.br",
        phone: "(11) 5050-6060",
        documentation: "https://docs.pixelpag.com.br",
        status: "available",
      },
    },
  ]

  ngOnInit(): void {
    // Initialize component
  }

  // Filter methods
  setCategory(category: string): void {
    this.filters.type = category
    this.currentPage = 1
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      type: "",
      status: "",
      integration: "",
      environment: "",
      dateFrom: "",
      dateTo: "",
      minVolume: "",
      maxVolume: "",
    }
    this.currentPage = 1
  }

  // Dialog methods
  openAcquirerDetail(acquirer: Acquirer): void {
    this.selectedAcquirer = acquirer
    this.acquirerDetailVisible = true
  }

  openConfigDialog(acquirer: Acquirer): void {
    this.selectedAcquirer = acquirer
    this.editConfig = { ...acquirer.config }
    this.configDialogVisible = true
  }

  openAddAcquirer(): void {
    this.newAcquirer = {
      name: "",
      type: "all",
      status: "inactive",
      integration: "api",
      environment: "sandbox",
      apiVersion: "v1.0",
      paymentMethods: {
        pix: false,
        creditCard: false,
        debitCard: false,
        boleto: false,
      },
      config: {
        merchantId: "",
        apiKey: "",
        secretKey: "",
        webhookUrl: "",
        callbackUrl: "",
        timeout: 30000,
        retryAttempts: 3,
      },
      fees: {
        creditCard: 0,
        debitCard: 0,
        pix: 0,
        boleto: 0,
        installments: {},
      },
    }
    this.addAcquirerVisible = true
  }

  handleDialogAction(action: string): void {
    if (action === "save_config") {
      this.saveConfig()
    } else if (action === "test_connection") {
      this.testConnection()
    } else if (action === "save_acquirer") {
      this.saveAcquirer()
    } else if (action === "close" || action === "cancel") {
      this.acquirerDetailVisible = false
      this.configDialogVisible = false
      this.addAcquirerVisible = false
    }
  }

  saveConfig(): void {
    if (this.selectedAcquirer) {
      this.selectedAcquirer.config = { ...this.editConfig }
      this.selectedAcquirer.updatedAt = new Date()
      console.log("Config saved:", this.editConfig)
      alert("Configuração salva com sucesso!")
    }
    this.configDialogVisible = false
  }

  saveAcquirer(): void {
    if (this.newAcquirer.name && this.newAcquirer.config?.merchantId) {
      const acquirer: Acquirer = {
        id: (this.acquirers.length + 1).toString(),
        name: this.newAcquirer.name,
        logo: "/placeholder.svg?height=60&width=120",
        type: this.newAcquirer.type || "all",
        status: this.newAcquirer.status || "inactive",
        integration: this.newAcquirer.integration || "api",
        environment: this.newAcquirer.environment || "sandbox",
        apiVersion: this.newAcquirer.apiVersion || "v1.0",
        lastSync: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        usingSince: new Date(),
        paymentMethods: this.newAcquirer.paymentMethods || {
          pix: false,
          creditCard: false,
          debitCard: false,
          boleto: false,
        },
        config: this.newAcquirer.config as any,
        fees: this.newAcquirer.fees as any,
        metrics: {
          totalTransactions: 0,
          totalVolume: 0,
          successRate: 0,
          averageResponseTime: 0,
          monthlyTransactions: 0,
          monthlyVolume: 0,
          errorRate: 0,
          uptime: 0,
        },
        limits: {
          dailyLimit: 10000,
          monthlyLimit: 200000,
          transactionLimit: 5000,
          minimumAmount: 1,
          maximumAmount: 5000,
        },
        support: {
          email: "",
          phone: "",
          documentation: "",
          status: "unavailable",
        },
      }

      this.acquirers.push(acquirer)
      this.metrics.totalAcquirers.value++
      alert("Adquirente adicionado com sucesso!")
    } else {
      alert("Preencha os campos obrigatórios!")
    }
    this.addAcquirerVisible = false
  }

  testConnection(): void {
    console.log("Testing connection for:", this.selectedAcquirer?.name)
    alert("Testando conexão... Conexão estabelecida com sucesso!")
  }

  toggleAcquirerStatus(acquirer: Acquirer): void {
    if (acquirer.status === "active") {
      acquirer.status = "inactive"
    } else if (acquirer.status === "inactive") {
      acquirer.status = "active"
    }
    acquirer.updatedAt = new Date()
  }

  togglePaymentMethod(acquirer: Acquirer, method: keyof Acquirer["paymentMethods"]): void {
    acquirer.paymentMethods[method] = !acquirer.paymentMethods[method]
    acquirer.updatedAt = new Date()
  }

  syncAcquirer(acquirer: Acquirer): void {
    acquirer.lastSync = new Date()
    console.log("Syncing acquirer:", acquirer.name)
    alert(`Sincronização iniciada para ${acquirer.name}`)
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.filteredAcquirers.length / this.itemsPerPage)
  }

  get pageAcquirers(): Acquirer[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredAcquirers.slice(startIndex, startIndex + this.itemsPerPage)
  }

  goToPage(page: number): void {
    this.currentPage = page
  }

  // Utility methods
  formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(2)}%`
  }

  formatResponseTime(value: number): string {
    return `${value.toFixed(1)}s`
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "danger"
      case "maintenance":
        return "warning"
      default:
        return "secondary"
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      case "maintenance":
        return "Manutenção"
      default:
        return status
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case "credit":
        return "Cartão de Crédito"
      case "debit":
        return "Cartão de Débito"
      case "pix":
        return "PIX"
      case "boleto":
        return "Boleto"
      case "all":
        return "Todos"
      default:
        return type
    }
  }

  getIntegrationLabel(integration: string): string {
    switch (integration) {
      case "api":
        return "API REST"
      case "sdk":
        return "SDK"
      case "webhook":
        return "Webhook"
      default:
        return integration
    }
  }

  // Filtered acquirers based on current filters
  get filteredAcquirers(): Acquirer[] {
    let result = [...this.acquirers]
    const f = this.filters

    // Apply text search
    if (f.search) {
      const searchLower = f.search.toLowerCase()
      result = result.filter(
        (a) => a.name.toLowerCase().includes(searchLower) || a.config.merchantId.toLowerCase().includes(searchLower),
      )
    }

    // Apply type filter
    if (f.type) {
      result = result.filter((a) => a.type === f.type || a.type === "all")
    }

    // Apply status filter
    if (f.status) {
      result = result.filter((a) => a.status === f.status)
    }

    // Apply integration filter
    if (f.integration) {
      result = result.filter((a) => a.integration === f.integration)
    }

    // Apply environment filter
    if (f.environment) {
      result = result.filter((a) => a.environment === f.environment)
    }

    // Apply volume range filter
    if (f.minVolume) {
      result = result.filter((a) => a.metrics.totalVolume >= Number.parseFloat(f.minVolume))
    }
    if (f.maxVolume) {
      result = result.filter((a) => a.metrics.totalVolume <= Number.parseFloat(f.maxVolume))
    }

    // Apply date range filter
    if (f.dateFrom) {
      result = result.filter((a) => a.createdAt >= new Date(f.dateFrom))
    }
    if (f.dateTo) {
      result = result.filter((a) => a.createdAt <= new Date(f.dateTo))
    }

    return result
  }
}
