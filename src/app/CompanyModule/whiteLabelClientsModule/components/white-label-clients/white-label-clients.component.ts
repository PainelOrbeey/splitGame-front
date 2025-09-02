import { Component, type OnInit } from "@angular/core"
import type { WhiteLabelClient, ClientMetrics, ClientFilters } from "../../interfaces/white-label-client.interface"
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
  selectedClient!: WhiteLabelClient

  metrics: ClientMetrics = {
    totalClients: 0,
    activeClients: 0,
    totalVolume: 0,
    averageTicket: 0,
    conversionRate: 0,
    newClientsThisMonth: 0,
  }

  filters: ClientFilters = {
    search: "",
    status: "",
    clientType: "",
    kycStatus: "",
    riskLevel: "",
    partnerName: "",
    brandName: "",
    minVolume: null,
    maxVolume: null,
    period: "all",
    dateFrom: "",
    dateTo: "",
    preferredPaymentMethod: "",
  }

  // Pagination
  currentPage = 1
  itemsPerPage = 12
  totalPages = 1

  // UI States
  sidebarVisible = false
  detailsVisible = false
  isLoading = false

  ngOnInit() {
    this.loadClients()
    this.updateMetrics()
  }

  loadClients() {
    this.isLoading = true

    // Mock data with real working avatar URLs
    this.clients = [

      {
        id: "CLI002",
        clientName: "Carlos Eduardo Mendes",
        clientEmail: "carlos.mendes@empresa.com",
        clientPhone: "(21) 98888-5678",
        clientDocument: "12.345.678/0001-90",
        clientType: "BUSINESS",
        partnerName: "FinanceHub",
        brandName: "QuickPay",
        status: "ACTIVE",
        kycStatus: "APPROVED",
        riskLevel: "MEDIUM",
        totalTransactions: 89,
        totalVolume: 125000.0,
        averageTicket: 1404.49,
        registrationDate: new Date("2024-02-20"),
        lastActivity: new Date("2024-11-28"),
        preferredPaymentMethod: "Cartão de Crédito",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "Av. Paulista, 1000",
          city: "Rio de Janeiro",
          state: "RJ",
          zipCode: "20000-000",
          country: "Brasil",
        },
        companyInfo: {
          cnpj: "12.345.678/0001-90",
          corporateName: "Mendes & Associados Ltda",
          tradeName: "Mendes Consultoria",
          businessType: "Consultoria",
        },
        tags: ["Empresarial", "Consultoria"],
      },
      {
        id: "CLI003",
        clientName: "Marina Costa Lima",
        clientEmail: "marina.costa@gmail.com",
        clientPhone: "(31) 97777-9012",
        clientDocument: "987.654.321-09",
        clientType: "INDIVIDUAL",
        partnerName: "PaymentPro",
        brandName: "InstantPay",
        status: "PENDING",
        kycStatus: "PENDING",
        riskLevel: "LOW",
        totalTransactions: 23,
        totalVolume: 12500.0,
        averageTicket: 543.48,
        registrationDate: new Date("2024-11-15"),
        lastActivity: new Date("2024-11-30"),
        preferredPaymentMethod: "PIX",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "Rua Minas Gerais, 456",
          city: "Belo Horizonte",
          state: "MG",
          zipCode: "30000-000",
          country: "Brasil",
        },
        tags: ["Novo Cliente"],
      },
      {
        id: "CLI004",
        clientName: "Roberto Santos Oliveira",
        clientEmail: "roberto.santos@tech.com",
        clientPhone: "(85) 96666-3456",
        clientDocument: "11.222.333/0001-44",
        clientType: "BUSINESS",
        partnerName: "TechPay Solutions",
        brandName: "PayFast",
        status: "ACTIVE",
        kycStatus: "APPROVED",
        riskLevel: "HIGH",
        totalTransactions: 234,
        totalVolume: 456000.0,
        averageTicket: 1948.72,
        registrationDate: new Date("2023-08-10"),
        lastActivity: new Date("2024-12-02"),
        preferredPaymentMethod: "Transferência",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "Av. Beira Mar, 789",
          city: "Fortaleza",
          state: "CE",
          zipCode: "60000-000",
          country: "Brasil",
        },
        companyInfo: {
          cnpj: "11.222.333/0001-44",
          corporateName: "Santos Tech Solutions Ltda",
          tradeName: "SantosTech",
          businessType: "Tecnologia",
        },
        tags: ["Alto Risco", "Grande Volume", "Tecnologia"],
      },
      {
        id: "CLI005",
        clientName: "Fernanda Lima Pereira",
        clientEmail: "fernanda.lima@design.com",
        clientPhone: "(47) 95555-7890",
        clientDocument: "555.666.777-88",
        clientType: "INDIVIDUAL",
        partnerName: "DesignPay",
        brandName: "CreativePay",
        status: "INACTIVE",
        kycStatus: "EXPIRED",
        riskLevel: "MEDIUM",
        totalTransactions: 67,
        totalVolume: 34500.0,
        averageTicket: 514.93,
        registrationDate: new Date("2024-03-05"),
        lastActivity: new Date("2024-10-15"),
        preferredPaymentMethod: "Cartão de Débito",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "Rua das Palmeiras, 321",
          city: "Florianópolis",
          state: "SC",
          zipCode: "88000-000",
          country: "Brasil",
        },
        tags: ["Designer", "Freelancer"],
      },
      {
        id: "CLI006",
        clientName: "Lucas Oliveira Costa",
        clientEmail: "lucas.oliveira@startup.com",
        clientPhone: "(61) 94444-2468",
        clientDocument: "22.333.444/0001-55",
        clientType: "BUSINESS",
        partnerName: "StartupPay",
        brandName: "InnovaPay",
        status: "BLOCKED",
        kycStatus: "REJECTED",
        riskLevel: "HIGH",
        totalTransactions: 12,
        totalVolume: 8900.0,
        averageTicket: 741.67,
        registrationDate: new Date("2024-10-01"),
        lastActivity: new Date("2024-11-01"),
        preferredPaymentMethod: "PIX",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "SQN 123, Bloco A",
          city: "Brasília",
          state: "DF",
          zipCode: "70000-000",
          country: "Brasil",
        },
        companyInfo: {
          cnpj: "22.333.444/0001-55",
          corporateName: "Oliveira Inovação Ltda",
          tradeName: "InnovaLab",
          businessType: "Startup",
        },
        tags: ["Bloqueado", "Startup", "Risco"],
      },
    ]

    this.applyFilters()
    this.isLoading = false
  }

  updateMetrics() {
    this.metrics = {
      totalClients: this.clients.length,
      activeClients: this.clients.filter((c) => c.status === "ACTIVE").length,
      totalVolume: this.clients.reduce((sum, c) => sum + c.totalVolume, 0),
      averageTicket: this.clients.reduce((sum, c) => sum + c.averageTicket, 0) / this.clients.length,
      conversionRate: (this.clients.filter((c) => c.status === "ACTIVE").length / this.clients.length) * 100,
      newClientsThisMonth: this.clients.filter((c) => {
        const now = new Date()
        const clientDate = new Date(c.registrationDate)
        return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear()
      }).length,
    }
  }

  applyFilters() {
    this.filteredClients = this.clients.filter((client) => {
      const matchesSearch =
        !this.filters.search ||
        client.clientName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.clientEmail.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.partnerName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.brandName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        client.id.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || client.status === this.filters.status
      const matchesType = !this.filters.clientType || client.clientType === this.filters.clientType
      const matchesKyc = !this.filters.kycStatus || client.kycStatus === this.filters.kycStatus
      const matchesRisk = !this.filters.riskLevel || client.riskLevel === this.filters.riskLevel
      const matchesPartner =
        !this.filters.partnerName || client.partnerName.toLowerCase().includes(this.filters.partnerName.toLowerCase())
      const matchesBrand =
        !this.filters.brandName || client.brandName.toLowerCase().includes(this.filters.brandName.toLowerCase())
      const matchesMinVolume = !this.filters.minVolume || client.totalVolume >= this.filters.minVolume
      const matchesMaxVolume = !this.filters.maxVolume || client.totalVolume <= this.filters.maxVolume

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesKyc &&
        matchesRisk &&
        matchesPartner &&
        matchesBrand &&
        matchesMinVolume &&
        matchesMaxVolume
      )
    })

    this.updatePagination()
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage)
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1)

    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedClients = this.filteredClients.slice(startIndex, endIndex)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePagination()
    }
  }

  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      clientType: "",
      kycStatus: "",
      riskLevel: "",
      partnerName: "",
      brandName: "",
      minVolume: null,
      maxVolume: null,
      period: "all",
      dateFrom: "",
      dateTo: "",
      preferredPaymentMethod: "",
    }
    this.applyFilters()
  }

  viewDetails(client: WhiteLabelClient) {
    this.selectedClient = client
    this.detailsVisible = true
  }

  exportCSV() {
    // Implementation for CSV export
    console.log("Exporting CSV...")
  }

  // Helper methods
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
    } else {
      return new Intl.NumberFormat("pt-BR").format(value)
    }
  }

  formatDocument(document: string, type: string): string {
    if (type === "INDIVIDUAL") {
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    } else {
      return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      ACTIVE: "status-active",
      INACTIVE: "status-inactive",
      PENDING: "status-pending",
      BLOCKED: "status-blocked",
    }
    return classes[status] || ""
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      ACTIVE: "Ativo",
      INACTIVE: "Inativo",
      PENDING: "Pendente",
      BLOCKED: "Bloqueado",
    }
    return labels[status] || status
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      INDIVIDUAL: "Pessoa Física",
      BUSINESS: "Pessoa Jurídica",
    }
    return labels[type] || type
  }

  getKycClass(status: string): string {
    const classes: { [key: string]: string } = {
      APPROVED: "kyc-approved",
      PENDING: "kyc-pending",
      REJECTED: "kyc-rejected",
      EXPIRED: "kyc-expired",
    }
    return classes[status] || ""
  }

  getKycLabel(status: string): string {
    const labels: { [key: string]: string } = {
      APPROVED: "Aprovado",
      PENDING: "Pendente",
      REJECTED: "Rejeitado",
      EXPIRED: "Expirado",
    }
    return labels[status] || status
  }

  getRiskClass(level: string): string {
    const classes: { [key: string]: string } = {
      LOW: "risk-low",
      MEDIUM: "risk-medium",
      HIGH: "risk-high",
    }
    return classes[level] || ""
  }

  getRiskLabel(level: string): string {
    const labels: { [key: string]: string } = {
      LOW: "Baixo",
      MEDIUM: "Médio",
      HIGH: "Alto",
    }
    return labels[level] || level
  }

  getActivityStatus(lastActivity: Date): string {
    const now = new Date()
    const diff = now.getTime() - new Date(lastActivity).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Hoje"
    if (days === 1) return "Ontem"
    if (days < 7) return `${days} dias atrás`
    if (days < 30) return `${Math.floor(days / 7)} semanas atrás`
    return `${Math.floor(days / 30)} meses atrás`
  }
}
