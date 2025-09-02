import { Component, type OnInit } from "@angular/core"
import type { Integration, IntegrationFilters } from "../../interfaces/integration.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-integrations",
  templateUrl: "./integrations.component.html",
  styleUrls: ["./integrations.component.scss"],
  standalone: true,
          imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class IntegrationsComponent implements OnInit {
  integrations: Integration[] = []
  filteredIntegrations: Integration[] = []
  selectedIntegration!: Integration
  detailsVisible = false
  connectVisible = false

  filters: IntegrationFilters = {
    search: "",
    category: "",
    status: "",
  }

  categories = [
    { label: "Todos", value: "" },
    { label: "Pagamentos", value: "payment" },
    { label: "Analytics", value: "analytics" },
    { label: "Marketing", value: "marketing" },
    { label: "Comunicação", value: "communication" },
    { label: "Armazenamento", value: "storage" },
    { label: "Segurança", value: "security" },
  ]

  statusOptions = [
    { label: "Todos", value: "" },
    { label: "Conectado", value: "connected" },
    { label: "Desconectado", value: "disconnected" },
    { label: "Erro", value: "error" },
    { label: "Pendente", value: "pending" },
  ]

  ngOnInit() {
    this.loadIntegrations()
    this.applyFilters()
  }

  loadIntegrations() {
    this.integrations = [
      {
        id: "1",
        name: "Stripe",
        description: "Processamento de pagamentos online com APIs robustas",
        category: "payment",
        status: "connected",
        icon: "pi pi-credit-card",
        color: "#635BFF",
        isActive: true,
        connectedAt: new Date("2024-01-15"),
        lastSync: new Date(),
        version: "2023-10-16",
        features: ["Pagamentos", "Assinaturas", "Webhooks", "Relatórios"],
        metrics: {
          totalRequests: 15420,
          successRate: 99.2,
          lastRequest: new Date(),
          errorCount: 12,
          avgResponseTime: 245,
        },
      },
      {
        id: "2",
        name: "Google Analytics",
        description: "Análise completa de dados e comportamento dos usuários",
        category: "analytics",
        status: "connected",
        icon: "pi pi-chart-line",
        color: "#FF6B00",
        isActive: true,
        connectedAt: new Date("2024-02-01"),
        lastSync: new Date(Date.now() - 3600000),
        version: "GA4",
        features: ["Eventos", "Conversões", "Audiências", "Relatórios"],
        metrics: {
          totalRequests: 8750,
          successRate: 98.8,
          lastRequest: new Date(Date.now() - 3600000),
          errorCount: 5,
          avgResponseTime: 180,
        },
      },
      {
        id: "3",
        name: "Mailchimp",
        description: "Automação de marketing por email e campanhas",
        category: "marketing",
        status: "error",
        icon: "pi pi-envelope",
        color: "#FFE01B",
        isActive: false,
        connectedAt: new Date("2024-01-20"),
        lastSync: new Date(Date.now() - 86400000),
        version: "3.0",
        features: ["Email Marketing", "Automação", "Segmentação", "A/B Testing"],
        metrics: {
          totalRequests: 2340,
          successRate: 85.2,
          lastRequest: new Date(Date.now() - 86400000),
          errorCount: 45,
          avgResponseTime: 520,
        },
      },
      {
        id: "4",
        name: "Slack",
        description: "Comunicação em equipe e notificações em tempo real",
        category: "communication",
        status: "connected",
        icon: "pi pi-comments",
        color: "#4A154B",
        isActive: true,
        connectedAt: new Date("2024-02-10"),
        lastSync: new Date(Date.now() - 1800000),
        version: "1.7",
        features: ["Mensagens", "Canais", "Webhooks", "Bots"],
        metrics: {
          totalRequests: 5680,
          successRate: 99.8,
          lastRequest: new Date(Date.now() - 1800000),
          errorCount: 2,
          avgResponseTime: 95,
        },
      },
      {
        id: "5",
        name: "AWS S3",
        description: "Armazenamento seguro e escalável na nuvem",
        category: "storage",
        status: "connected",
        icon: "pi pi-cloud",
        color: "#FF9900",
        isActive: true,
        connectedAt: new Date("2024-01-05"),
        lastSync: new Date(Date.now() - 900000),
        version: "2006-03-01",
        features: ["Upload", "Download", "Backup", "CDN"],
        metrics: {
          totalRequests: 25600,
          successRate: 99.9,
          lastRequest: new Date(Date.now() - 900000),
          errorCount: 3,
          avgResponseTime: 120,
        },
      },
      {
        id: "6",
        name: "Auth0",
        description: "Autenticação e autorização segura para aplicações",
        category: "security",
        status: "disconnected",
        icon: "pi pi-shield",
        color: "#EB5424",
        isActive: false,
        version: "7.0",
        features: ["SSO", "MFA", "Social Login", "JWT"],
        metrics: {
          totalRequests: 0,
          successRate: 0,
          errorCount: 0,
          avgResponseTime: 0,
        },
      },
      {
        id: "7",
        name: "Twilio",
        description: "Comunicação via SMS, WhatsApp e chamadas de voz",
        category: "communication",
        status: "pending",
        icon: "pi pi-phone",
        color: "#F22F46",
        isActive: false,
        version: "2010-04-01",
        features: ["SMS", "WhatsApp", "Voice", "Video"],
        metrics: {
          totalRequests: 0,
          successRate: 0,
          errorCount: 0,
          avgResponseTime: 0,
        },
      },
      {
        id: "8",
        name: "HubSpot",
        description: "CRM completo com automação de vendas e marketing",
        category: "marketing",
        status: "disconnected",
        icon: "pi pi-users",
        color: "#FF7A59",
        isActive: false,
        version: "3",
        features: ["CRM", "Lead Scoring", "Email", "Landing Pages"],
        metrics: {
          totalRequests: 0,
          successRate: 0,
          errorCount: 0,
          avgResponseTime: 0,
        },
      },
    ]
  }

  applyFilters() {
    this.filteredIntegrations = this.integrations.filter((integration) => {
      const matchesSearch =
        !this.filters.search ||
        integration.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        integration.description.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesCategory = !this.filters.category || integration.category === this.filters.category
      const matchesStatus = !this.filters.status || integration.status === this.filters.status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  getStatusClass(status: string): string {
    const classes = {
      connected: "status-connected",
      disconnected: "status-disconnected",
      error: "status-error",
      pending: "status-pending",
    }
    return classes[status as keyof typeof classes] || ""
  }

  getStatusLabel(status: string): string {
    const labels = {
      connected: "Conectado",
      disconnected: "Desconectado",
      error: "Erro",
      pending: "Pendente",
    }
    return labels[status as keyof typeof labels] || status
  }

  getCategoryLabel(category: string): string {
    const labels = {
      payment: "Pagamentos",
      analytics: "Analytics",
      marketing: "Marketing",
      communication: "Comunicação",
      storage: "Armazenamento",
      security: "Segurança",
    }
    return labels[category as keyof typeof labels] || category
  }

  viewDetails(integration: Integration) {
    this.selectedIntegration = integration
    this.detailsVisible = true
  }

  connectIntegration(integration: Integration) {
    this.selectedIntegration = integration
    this.connectVisible = true
  }

  toggleIntegration(integration: Integration) {
    if (integration.status === "connected") {
      this.disconnectIntegration(integration)
    } else {
      this.connectIntegration(integration)
    }
  }

  disconnectIntegration(integration: Integration) {
    integration.status = "disconnected"
    integration.isActive = false
    integration.lastSync = undefined
    // Aqui você faria a chamada para a API
  }

  saveConnection() {
    if (this.selectedIntegration) {
      this.selectedIntegration.status = "connected"
      this.selectedIntegration.isActive = true
      this.selectedIntegration.connectedAt = new Date()
      this.selectedIntegration.lastSync = new Date()
    }
    this.connectVisible = false
  }

  testConnection(integration: Integration) {
    // Simular teste de conexão
    console.log("Testando conexão com:", integration.name)
  }

  fmt(value: number, type: string, min = 0, max = 2): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    }

    if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value / 100)
    }

    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    }).format(value)
  }
}
