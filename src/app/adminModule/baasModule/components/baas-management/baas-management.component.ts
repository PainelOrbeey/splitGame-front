import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { BaasService, BaasFilters, BaasMetrics } from "../../interfaces/baas.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-baas-management",
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
  templateUrl: "./baas-management.component.html",
  styleUrls: ["./baas-management.component.scss"],
})
export class BaasManagementComponent implements OnInit {
  // View state
  sidebarVisible = false
  serviceDetailVisible = false
  configDialogVisible = false
  addServiceVisible = false
  currentPage = 1
  readonly itemsPerPage = 6

  // Selected service
  selectedService: BaasService | null = null
  editConfig: any = {}
  newService: Partial<BaasService> = {}

  // Filters
  filters: BaasFilters = {
    search: "",
    category: "",
    status: "",
    provider: "",
    environment: "",
    compliance: "",
    dateFrom: "",
    dateTo: "",
    minCost: "",
    maxCost: "",
  }

  // Metrics
  metrics: BaasMetrics = {
    totalServices: { value: 3, delta: "+1", deltaType: "up" },
    activeServices: { value: 3, delta: "0", deltaType: "neutral" },
    totalRequests: { value: 1250000, delta: "+18.5%", deltaType: "up" },
    averageUptime: { value: 99.8, delta: "+0.2%", deltaType: "up" },
    totalCost: { value: 15000, delta: "+5.3%", deltaType: "up" },
    averageResponseTime: { value: 0.8, delta: "-0.1s", deltaType: "up" },
    errorRate: { value: 0.5, delta: "-0.2%", deltaType: "up" },
    complianceScore: { value: 98, delta: "+1%", deltaType: "up" },
  }

services: BaasService[] = [
  {
    id: "1",
    name: "Rapdyn",
    provider: "Rapdyn Technologies",
    logo: "https://app.appsplitgames.com/_next/image?url=https%3A%2F%2Ffastsoft-gateway.s3.amazonaws.com%2FAdquirentes%2Frapdyn.png&w=256&q=75&dpl=dpl_HaH16o12MQtqh4NpG2wsWFxv4dhV",
    category: "banking",
    status: "active",
    version: "v2.1.0",
    environment: "production",
    lastUpdate: new Date("2024-01-15"),
    createdAt: new Date("2025-08-01"),
    usingSince: new Date("2025-08-01"),
    api: {
      baseUrl: "https://api.rapdyn.com.br",
      version: "v2.1",
      authentication: "oauth2",
      rateLimit: { requests: 1000, period: "minute" },
      timeout: 30000,
      retries: 3,
    },
    security: {
      encryption: "AES256",
      compliance: ["PCI DSS", "LGPD", "Open Banking"],
      certifications: ["ISO 27001", "SOC 2"],
      dataLocation: "Brasil",
      backupFrequency: "Diário",
    },
    metrics: {
      totalRequests: 450000,
      successfulRequests: 448500,
      failedRequests: 1500,
      averageResponseTime: 0.6,
      uptime: 99.9,
      errorRate: 0.3,
      monthlyUsage: 125000,
      costPerRequest: 0.02,
      totalCost: 9000,
    },
    features: [
      { name: "Account Information", enabled: true, description: "Acesso a informações de conta", cost: 0.01 },
      { name: "Payment Initiation", enabled: true, description: "Iniciação de pagamentos", cost: 0.05 },
      { name: "Balance Check", enabled: true, description: "Consulta de saldo", cost: 0.005 },
      { name: "Transaction History", enabled: false, description: "Histórico de transações", cost: 0.02 },
    ],
    limits: {
      dailyRequests: 50000,
      monthlyRequests: 1000000,
      concurrentConnections: 100,
      dataStorage: 10000,
      bandwidth: 1000,
    },
    support: {
      level: "enterprise",
      email: "suporte@rapdyn.com.br",
      phone: "(11) 3000-1234",
      documentation: "https://docs.rapdyn.com.br",
      sla: "99.9%",
      responseTime: "2 horas",
    },
    billing: {
      model: "pay_per_use",
      currency: "BRL",
      baseCost: 500,
      additionalCosts: { extra_requests: 0.02, premium_support: 1000 },
      billingCycle: "monthly",
    },
  },
  {
    id: "2",
    name: "Receba",
    provider: "Receba Pagamentos",
    logo: "https://placehold.co/120x60?text=Receba&bg=0048ff&color=fff",
    category: "payment",
    status: "active",
    version: "v1.8.2",
    environment: "production",
    lastUpdate: new Date("2024-01-12"),
    createdAt: new Date("2025-07-16"),
    usingSince: new Date("2025-07-16"),
    api: {
      baseUrl: "https://api.receba.com.br",
      version: "v1.8",
      authentication: "jwt",
      rateLimit: { requests: 2000, period: "minute" },
      timeout: 15000,
      retries: 2,
    },
    security: {
      encryption: "TLS",
      compliance: ["LGPD", "PIX Regulation"],
      certifications: ["ISO 27001"],
      dataLocation: "Brasil",
      backupFrequency: "Tempo Real",
    },
    metrics: {
      totalRequests: 800000,
      successfulRequests: 799200,
      failedRequests: 800,
      averageResponseTime: 0.3,
      uptime: 99.95,
      errorRate: 0.1,
      monthlyUsage: 200000,
      costPerRequest: 0.01,
      totalCost: 8000,
    },
    features: [
      { name: "Instant Payment", enabled: true, description: "Pagamentos instantâneos", cost: 0.01 },
      { name: "QR Code Generation", enabled: true, description: "Geração de QR Code", cost: 0.005 },
      { name: "Payment Status", enabled: true, description: "Status de pagamento", cost: 0.002 },
      { name: "Refund Processing", enabled: true, description: "Processamento de estorno", cost: 0.02 },
    ],
    limits: {
      dailyRequests: 100000,
      monthlyRequests: 2000000,
      concurrentConnections: 200,
      dataStorage: 5000,
      bandwidth: 2000,
    },
    support: {
      level: "premium",
      email: "suporte@receba.com.br",
      phone: "(11) 3414-1234",
      documentation: "https://docs.receba.com.br",
      sla: "99.95%",
      responseTime: "1 hora",
    },
    billing: {
      model: "subscription",
      currency: "BRL",
      baseCost: 2000,
      additionalCosts: { volume_tier: 0.005 },
      billingCycle: "monthly",
    },
  },
  {
    id: "3",
    name: "Transfeera (Transfeera)",
    provider: "Transfeera",
    logo: "https://fastsoft-gateway.s3.amazonaws.com/Adquirentes/transfeera.svg",
    category: "banking",
    status: "active",
    version: "v3.2.1",
    environment: "production",
    lastUpdate: new Date("2024-01-10"),
    createdAt: new Date("2025-06-16"),
    usingSince: new Date("2025-06-16"),
    api: {
      baseUrl: "https://api.transfeera.com",
      version: "v3.2",
      authentication: "api_key",
      rateLimit: { requests: 500, period: "minute" },
      timeout: 45000,
      retries: 3,
    },
    security: {
      encryption: "RSA",
      compliance: ["LGPD", "GDPR", "Open Banking"],
      certifications: ["ISO 27001", "SOC 2 Type II"],
      dataLocation: "Brasil/EUA",
      backupFrequency: "Diário",
    },
    metrics: {
      totalRequests: 150000,
      successfulRequests: 148500,
      failedRequests: 1500,
      averageResponseTime: 1.2,
      uptime: 99.5,
      errorRate: 1.0,
      monthlyUsage: 35000,
      costPerRequest: 0.15,
      totalCost: 5250,
    },
    features: [
      { name: "Bank Transfer", enabled: true, description: "Transferências bancárias", cost: 0.1 },
      { name: "Bulk Payments", enabled: true, description: "Pagamentos em lote", cost: 0.25 },
      { name: "Account Validation", enabled: false, description: "Validação de contas", cost: 0.5 },
      { name: "Transaction Tracking", enabled: true, description: "Rastreamento de transações", cost: 0.08 },
    ],
    limits: {
      dailyRequests: 10000,
      monthlyRequests: 200000,
      concurrentConnections: 50,
      dataStorage: 50000,
      bandwidth: 500,
    },
    support: {
      level: "premium",
      email: "api.support@transfeera.com",
      phone: "(11) 4004-2000",
      documentation: "https://docs.transfeera.com",
      sla: "99.5%",
      responseTime: "4 horas",
    },
    billing: {
      model: "pay_per_use",
      currency: "BRL",
      baseCost: 1000,
      additionalCosts: { premium_features: 0.1, enterprise_support: 2000 },
      billingCycle: "monthly",
    },
  },
]


  ngOnInit(): void {
    // Initialize component
  }

  // Filter methods
  setCategory(category: string): void {
    this.filters.category = category
    this.currentPage = 1
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      category: "",
      status: "",
      provider: "",
      environment: "",
      compliance: "",
      dateFrom: "",
      dateTo: "",
      minCost: "",
      maxCost: "",
    }
    this.currentPage = 1
  }

  // Dialog methods
  openServiceDetail(service: BaasService): void {
    this.selectedService = service
    this.serviceDetailVisible = true
  }

  openConfigDialog(service: BaasService): void {
    this.selectedService = service
    this.editConfig = { ...service.api }
    this.configDialogVisible = true
  }

  openAddService(): void {
    this.newService = {
      name: "",
      provider: "",
      category: "banking",
      status: "inactive",
      version: "v1.0.0",
      environment: "sandbox",
      api: {
        baseUrl: "",
        version: "v1.0",
        authentication: "api_key",
        rateLimit: {
          requests: 100,
          period: "minute",
        },
        timeout: 30000,
        retries: 3,
      },
      security: {
        encryption: "TLS",
        compliance: [],
        certifications: [],
        dataLocation: "Brasil",
        backupFrequency: "Diário",
      },
      features: [],
      billing: {
        model: "pay_per_use",
        currency: "BRL",
        baseCost: 0,
        additionalCosts: {},
        billingCycle: "monthly",
      },
    }
    this.addServiceVisible = true
  }

  handleDialogAction(action: string): void {
    if (action === "save_config") {
      this.saveConfig()
    } else if (action === "test_api") {
      this.testApi()
    } else if (action === "save_service") {
      this.saveService()
    } else if (action === "toggle_service") {
      this.toggleServiceStatus()
    } else if (action === "close" || action === "cancel") {
      this.serviceDetailVisible = false
      this.configDialogVisible = false
      this.addServiceVisible = false
    }
  }

  saveConfig(): void {
    if (this.selectedService) {
      this.selectedService.api = { ...this.editConfig }
      this.selectedService.lastUpdate = new Date()
      console.log("Config saved:", this.editConfig)
      alert("Configuração salva com sucesso!")
    }
    this.configDialogVisible = false
  }

  saveService(): void {
    if (this.newService.name && this.newService.provider && this.newService.api?.baseUrl) {
      const service: BaasService = {
        id: (this.services.length + 1).toString(),
        name: this.newService.name,
        provider: this.newService.provider,
        logo: "/placeholder.svg?height=60&width=120",
        category: this.newService.category || "banking",
        status: this.newService.status || "inactive",
        version: this.newService.version || "v1.0.0",
        environment: this.newService.environment || "sandbox",
        lastUpdate: new Date(),
        createdAt: new Date(),
        usingSince: new Date(),
        api: this.newService.api as any,
        security: this.newService.security as any,
        metrics: {
          totalRequests: 0,
          successfulRequests: 0,
          failedRequests: 0,
          averageResponseTime: 0,
          uptime: 0,
          errorRate: 0,
          monthlyUsage: 0,
          costPerRequest: 0,
          totalCost: 0,
        },
        features: this.newService.features || [],
        limits: {
          dailyRequests: 1000,
          monthlyRequests: 20000,
          concurrentConnections: 10,
          dataStorage: 1000,
          bandwidth: 100,
        },
        support: {
          level: "basic",
          email: "",
          documentation: "",
          sla: "99%",
          responseTime: "24 horas",
        },
        billing: this.newService.billing as any,
      }

      this.services.push(service)
      this.metrics.totalServices.value++
      alert("Serviço BaaS adicionado com sucesso!")
    } else {
      alert("Preencha os campos obrigatórios!")
    }
    this.addServiceVisible = false
  }

  testApi(): void {
    console.log("Testing API for:", this.selectedService?.name)
    alert("Testando API... Conexão estabelecida com sucesso!")
  }

  toggleServiceStatus(): void {
    if (this.selectedService) {
      if (this.selectedService.status === "active") {
        this.selectedService.status = "inactive"
      } else if (this.selectedService.status === "inactive") {
        this.selectedService.status = "active"
      }
      this.selectedService.lastUpdate = new Date()
    }
  }

  toggleFeature(service: BaasService, featureIndex: number): void {
    service.features[featureIndex].enabled = !service.features[featureIndex].enabled
    service.lastUpdate = new Date()
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.filteredServices.length / this.itemsPerPage)
  }

  get pageServices(): BaasService[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredServices.slice(startIndex, startIndex + this.itemsPerPage)
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
      case "deprecated":
        return "secondary"
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
      case "deprecated":
        return "Descontinuado"
      default:
        return status
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case "banking":
        return "Banking"
      case "payment":
        return "Pagamentos"
      case "identity":
        return "Identidade"
      case "credit":
        return "Crédito"
      case "investment":
        return "Investimentos"
      case "insurance":
        return "Seguros"
      default:
        return category
    }
  }

  getBillingModelLabel(model: string): string {
    switch (model) {
      case "pay_per_use":
        return "Pague por Uso"
      case "subscription":
        return "Assinatura"
      case "freemium":
        return "Freemium"
      default:
        return model
    }
  }

  // Filtered services based on current filters
  get filteredServices(): BaasService[] {
    let result = [...this.services]
    const f = this.filters

    // Apply text search
    if (f.search) {
      const searchLower = f.search.toLowerCase()
      result = result.filter(
        (s) => s.name.toLowerCase().includes(searchLower) || s.provider.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (f.category) {
      result = result.filter((s) => s.category === f.category)
    }

    // Apply status filter
    if (f.status) {
      result = result.filter((s) => s.status === f.status)
    }

    // Apply provider filter
    if (f.provider) {
      result = result.filter((s) => s.provider.toLowerCase().includes(f.provider.toLowerCase()))
    }

    // Apply environment filter
    if (f.environment) {
      result = result.filter((s) => s.environment === f.environment)
    }

    // Apply compliance filter
    if (f.compliance) {
      result = result.filter((s) =>
        s.security.compliance.some((c) => c.toLowerCase().includes(f.compliance.toLowerCase())),
      )
    }

    // Apply cost range filter
    if (f.minCost) {
      result = result.filter((s) => s.metrics.totalCost >= Number.parseFloat(f.minCost))
    }
    if (f.maxCost) {
      result = result.filter((s) => s.metrics.totalCost <= Number.parseFloat(f.maxCost))
    }

    // Apply date range filter
    if (f.dateFrom) {
      result = result.filter((s) => s.createdAt >= new Date(f.dateFrom))
    }
    if (f.dateTo) {
      result = result.filter((s) => s.createdAt <= new Date(f.dateTo))
    }

    return result
  }
}
