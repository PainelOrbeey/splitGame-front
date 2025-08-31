import { Component, type OnInit } from "@angular/core"
import type { WhiteLabelClient, ClientFilters, ClientMetrics } from "../../interfaces/white-label-client.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-white-label-clients",
  templateUrl: "./white-label-clients.component.html",
  styleUrls: ["./white-label-clients.component.scss"],
  standalone: true,
      imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class WhiteLabelClientsComponent implements OnInit {
  clients: WhiteLabelClient[] = []
  filteredClients: WhiteLabelClient[] = []
  paginatedClients: WhiteLabelClient[] = []

  metrics: ClientMetrics = {
    totalClients: 8947,
    activeClients: 7234,
    newClientsThisMonth: 456,
    totalVolume: 3456789.5,
    averageTicket: 387.45,
    conversionRate: 85.2,
    clientsByType: [
      { type: "INDIVIDUAL", count: 5678, percentage: 63.5 },
      { type: "BUSINESS", count: 3269, percentage: 36.5 },
    ],
    clientsByStatus: [
      { status: "ACTIVE", count: 7234, percentage: 80.9 },
      { status: "INACTIVE", count: 1234, percentage: 13.8 },
      { status: "PENDING", count: 345, percentage: 3.9 },
      { status: "BLOCKED", count: 134, percentage: 1.5 },
    ],
    topPartnersByClients: [
      { partnerName: "TechSolutions Ltda", clientCount: 1234, volume: 567890.0 },
      { partnerName: "E-commerce Plus", clientCount: 987, volume: 456789.0 },
      { partnerName: "EduTech Brasil", clientCount: 654, volume: 234567.0 },
    ],
  }

  filters: ClientFilters = {
    search: "",
    status: "",
    clientType: "",
    kycStatus: "",
    riskLevel: "",
    partnerName: "",
    brandName: "",
    period: "all",
  }

  currentPage = 1
  itemsPerPage = 10
  totalPages = 0
  sidebarVisible = false
  detailsVisible = false
  selectedClient: WhiteLabelClient | null = null

  ngOnInit(): void {
    this.loadClients()
    this.applyFilters()
  }

  loadClients(): void {
    // Simulando dados de clientes
    this.clients = [
      {
        id: "CLI001",
        partnerName: "TechSolutions Ltda",
        brandName: "TechPay",
        clientName: "João Silva Santos",
        clientEmail: "joao.silva@email.com",
        clientPhone: "+55 11 99999-9999",
        clientDocument: "123.456.789-00",
        clientType: "INDIVIDUAL",
        status: "ACTIVE",
        registrationDate: new Date("2024-01-10T10:30:00"),
        lastActivity: new Date("2024-01-15T14:20:00"),
        totalTransactions: 45,
        totalVolume: 12500.0,
        averageTicket: 277.78,
        preferredPaymentMethod: "PIX",
        address: {
          street: "Rua das Flores, 123",
          city: "São Paulo",
          state: "SP",
          zipCode: "01234-567",
          country: "Brasil",
        },
        kycStatus: "APPROVED",
        riskLevel: "LOW",
        tags: ["VIP", "Recorrente"],
      },
      {
        id: "CLI002",
        partnerName: "E-commerce Plus",
        brandName: "ShopFast",
        clientName: "Maria Oliveira Ltda",
        clientEmail: "contato@mariaoliveira.com.br",
        clientPhone: "+55 21 88888-8888",
        clientDocument: "12.345.678/0001-90",
        clientType: "BUSINESS",
        status: "ACTIVE",
        registrationDate: new Date("2024-01-08T09:15:00"),
        lastActivity: new Date("2024-01-14T16:45:00"),
        totalTransactions: 128,
        totalVolume: 45600.0,
        averageTicket: 356.25,
        preferredPaymentMethod: "Cartão de Crédito",
        address: {
          street: "Av. Paulista, 1000",
          city: "Rio de Janeiro",
          state: "RJ",
          zipCode: "20000-000",
          country: "Brasil",
        },
        kycStatus: "APPROVED",
        riskLevel: "MEDIUM",
        tags: ["Corporativo", "Alto Volume"],
        companyInfo: {
          cnpj: "12.345.678/0001-90",
          corporateName: "Maria Oliveira Comércio Ltda",
          tradeName: "Loja da Maria",
          businessType: "Varejo",
        },
      },
      {
        id: "CLI003",
        partnerName: "EduTech Brasil",
        brandName: "LearnPay",
        clientName: "Carlos Mendes",
        clientEmail: "carlos.mendes@email.com",
        clientPhone: "+55 31 77777-7777",
        clientDocument: "987.654.321-00",
        clientType: "INDIVIDUAL",
        status: "PENDING",
        registrationDate: new Date("2024-01-12T11:00:00"),
        lastActivity: new Date("2024-01-12T11:00:00"),
        totalTransactions: 0,
        totalVolume: 0,
        averageTicket: 0,
        preferredPaymentMethod: "Boleto",
        address: {
          street: "Rua Minas Gerais, 456",
          city: "Belo Horizonte",
          state: "MG",
          zipCode: "30000-000",
          country: "Brasil",
        },
        kycStatus: "PENDING",
        riskLevel: "LOW",
        tags: ["Novo Cliente"],
      },
    ]
  }

  applyFilters(): void {
    this.filteredClients = this.clients.filter((client) => {
      const matchesSearch =
        !this.filters.search ||
        client.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.clientName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.clientEmail.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.partnerName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.brandName.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || client.status === this.filters.status
      const matchesType = !this.filters.clientType || client.clientType === this.filters.clientType
      const matchesKyc = !this.filters.kycStatus || client.kycStatus === this.filters.kycStatus
      const matchesRisk = !this.filters.riskLevel || client.riskLevel === this.filters.riskLevel
      const matchesPartner =
        !this.filters.partnerName || client.partnerName.toLowerCase().includes(this.filters.partnerName.toLowerCase())
      const matchesBrand =
        !this.filters.brandName || client.brandName.toLowerCase().includes(this.filters.brandName.toLowerCase())
      const matchesVolume =
        (!this.filters.minVolume || client.totalVolume >= this.filters.minVolume) &&
        (!this.filters.maxVolume || client.totalVolume <= this.filters.maxVolume)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesKyc &&
        matchesRisk &&
        matchesPartner &&
        matchesBrand &&
        matchesVolume
      )
    })

    this.totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage)
    this.currentPage = 1
    this.updatePaginatedClients()
  }

  updatePaginatedClients(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedClients = this.filteredClients.slice(startIndex, endIndex)
  }

  setStatus(status: string): void {
    this.filters.status = status
    this.applyFilters()
  }

  changePage(page: number): void {
    this.currentPage = page
    this.updatePaginatedClients()
  }

  viewDetails(client: WhiteLabelClient): void {
    this.selectedClient = client
    this.detailsVisible = true
  }

  exportCSV(): void {
    console.log("Exportando clientes para CSV")
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      status: "",
      clientType: "",
      kycStatus: "",
      riskLevel: "",
      partnerName: "",
      brandName: "",
      period: "all",
    }
    this.applyFilters()
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      ACTIVE: "status-active",
      INACTIVE: "status-inactive",
      PENDING: "status-pending",
      BLOCKED: "status-blocked",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  getStatusLabel(status: string): string {
    const statusLabels = {
      ACTIVE: "Ativo",
      INACTIVE: "Inativo",
      PENDING: "Pendente",
      BLOCKED: "Bloqueado",
    }
    return statusLabels[status as keyof typeof statusLabels] || status
  }

  getKycClass(status: string): string {
    const kycClasses = {
      APPROVED: "kyc-approved",
      PENDING: "kyc-pending",
      REJECTED: "kyc-rejected",
      EXPIRED: "kyc-expired",
    }
    return kycClasses[status as keyof typeof kycClasses] || ""
  }

  getKycLabel(status: string): string {
    const kycLabels = {
      APPROVED: "Aprovado",
      PENDING: "Pendente",
      REJECTED: "Rejeitado",
      EXPIRED: "Expirado",
    }
    return kycLabels[status as keyof typeof kycLabels] || status
  }

  getRiskClass(level: string): string {
    const riskClasses = {
      LOW: "risk-low",
      MEDIUM: "risk-medium",
      HIGH: "risk-high",
    }
    return riskClasses[level as keyof typeof riskClasses] || ""
  }

  getRiskLabel(level: string): string {
    const riskLabels = {
      LOW: "Baixo",
      MEDIUM: "Médio",
      HIGH: "Alto",
    }
    return riskLabels[level as keyof typeof riskLabels] || level
  }

  getTypeLabel(type: string): string {
    const typeLabels = {
      INDIVIDUAL: "Pessoa Física",
      BUSINESS: "Pessoa Jurídica",
    }
    return typeLabels[type as keyof typeof typeLabels] || type
  }

  fmt(value: number, type: string, min = 0, max = 2): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    } else if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value / 100)
    } else if (type === "int") {
      return new Intl.NumberFormat("pt-BR").format(value)
    }
    return value.toString()
  }

  formatDocument(document: string, type: string): string {
    if (type === "INDIVIDUAL") {
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    } else {
      return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
  }
}
