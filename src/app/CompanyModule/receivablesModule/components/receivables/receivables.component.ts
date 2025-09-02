import { Component, type OnInit } from "@angular/core"
import type { Receivable, ReceivableMetrics, ReceivableFilters } from "../../interfaces/receivable.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-receivables",
  templateUrl: "./receivables.component.html",
  styleUrls: ["./receivables.component.scss"],
    standalone: true,
        imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class ReceivablesComponent implements OnInit {
  receivables: Receivable[] = []
  filteredReceivables: Receivable[] = []
  paginatedReceivables: Receivable[] = []
  selectedReceivable: Receivable | null = null

  metrics: ReceivableMetrics = {
    totalReceivables: 0,
    totalAmount: 0,
    receivedAmount: 0,
    pendingAmount: 0,
    averageAmount: 0,
    successRate: 0,
    averageProcessingTime: 0,
  }

  filters: ReceivableFilters = {
    search: "",
    status: "",
    paymentMethod: "",
    acquirer: "",
    priority: "",
    minAmount: null,
    maxAmount: null,
    dateFrom: "",
    dateTo: "",
    period: "all",
    hasInstallments: null,
    customer: "",
    reference: "",
  }

  // Pagination
  currentPage = 1
  itemsPerPage = 12
  totalPages = 0

  // UI States
  sidebarVisible = false
  detailsVisible = false
  viewMode: "cards" | "timeline" = "cards"

  ngOnInit() {
    this.loadReceivables()
    this.updateMetrics()
  }

  loadReceivables() {
    // Simulated data
    this.receivables = [
      {
        id: "REC001",
        companyId: "COMP001",
        companyName: "TechCorp Ltda",
        amount: 15000,
        netAmount: 14250,
        fees: 750,
        status: "received",
        paymentMethod: "pix",
        dueDate: new Date("2024-01-15"),
        receivedDate: new Date("2024-01-14"),
        createdDate: new Date("2024-01-10"),
        description: "Pagamento de serviços de consultoria",
        reference: "CONS-2024-001",
        acquirer: "Stone",
        installments: 1,
        currentInstallment: 1,
        priority: "high",
        tags: ["consultoria", "tech", "mensal"],
        customer: {
          name: "João Silva",
          email: "joao@techcorp.com",
          document: "12345678901",
          phone: "(11) 99999-9999",
        },
        pixKey: "joao@techcorp.com",
        metadata: {
          source: "website",
          campaign: "tech-services",
          affiliate: "AFF001",
        },
      },
      {
        id: "REC002",
        companyId: "COMP002",
        companyName: "Design Studio",
        amount: 8500,
        netAmount: 8075,
        fees: 425,
        status: "pending",
        paymentMethod: "ted",
        dueDate: new Date("2024-01-20"),
        createdDate: new Date("2024-01-12"),
        description: "Projeto de identidade visual",
        reference: "DESIGN-2024-002",
        acquirer: "Cielo",
        installments: 3,
        currentInstallment: 1,
        priority: "normal",
        tags: ["design", "branding", "projeto"],
        customer: {
          name: "Maria Santos",
          email: "maria@designstudio.com",
          document: "98765432100",
          phone: "(11) 88888-8888",
        },
        bankAccount: {
          bank: "Banco do Brasil",
          agency: "1234",
          account: "56789-0",
          accountType: "Corrente",
        },
        metadata: {
          source: "referral",
          affiliate: "AFF002",
        },
      },
      {
        id: "REC003",
        companyId: "COMP003",
        companyName: "Marketing Pro",
        amount: 12000,
        netAmount: 11400,
        fees: 600,
        status: "processing",
        paymentMethod: "card",
        dueDate: new Date("2024-01-25"),
        createdDate: new Date("2024-01-15"),
        description: "Campanha de marketing digital",
        reference: "MKT-2024-003",
        acquirer: "Rede",
        installments: 2,
        currentInstallment: 1,
        priority: "high",
        tags: ["marketing", "digital", "campanha"],
        customer: {
          name: "Carlos Oliveira",
          email: "carlos@marketingpro.com",
          document: "11122233344",
          phone: "(11) 77777-7777",
        },
        metadata: {
          source: "social_media",
          campaign: "digital-marketing",
        },
      },
    ]

    this.applyFilters()
  }

  updateMetrics() {
    const total = this.receivables.length
    const totalAmount = this.receivables.reduce((sum, r) => sum + r.amount, 0)
    const receivedAmount = this.receivables.filter((r) => r.status === "received").reduce((sum, r) => sum + r.amount, 0)
    const pendingAmount = this.receivables.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.amount, 0)
    const successRate = total > 0 ? (this.receivables.filter((r) => r.status === "received").length / total) * 100 : 0

    this.metrics = {
      totalReceivables: total,
      totalAmount,
      receivedAmount,
      pendingAmount,
      averageAmount: total > 0 ? totalAmount / total : 0,
      successRate,
      averageProcessingTime: 2.5,
    }
  }

  applyFilters() {
    this.filteredReceivables = this.receivables.filter((receivable) => {
      const matchesSearch =
        !this.filters.search ||
        receivable.companyName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        receivable.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        receivable.customer.name.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || receivable.status === this.filters.status
      const matchesPaymentMethod =
        !this.filters.paymentMethod || receivable.paymentMethod === this.filters.paymentMethod
      const matchesAcquirer = !this.filters.acquirer || receivable.acquirer === this.filters.acquirer
      const matchesPriority = !this.filters.priority || receivable.priority === this.filters.priority

      const matchesMinAmount = this.filters.minAmount === null || receivable.amount >= this.filters.minAmount
      const matchesMaxAmount = this.filters.maxAmount === null || receivable.amount <= this.filters.maxAmount

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesAcquirer &&
        matchesPriority &&
        matchesMinAmount &&
        matchesMaxAmount
      )
    })

    this.updatePagination()
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredReceivables.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedReceivables = this.filteredReceivables.slice(startIndex, endIndex)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePagination()
    }
  }

  setStatus(status: string) {
    this.filters.status = status
    this.currentPage = 1
    this.applyFilters()
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
      dateFrom: "",
      dateTo: "",
      period: "all",
      hasInstallments: null,
      customer: "",
      reference: "",
    }
    this.applyFilters()
  }

  viewDetails(receivable: Receivable) {
    this.selectedReceivable = receivable
    this.detailsVisible = true
  }

  exportCSV() {
    console.log("Exportando recebimentos...")
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === "cards" ? "timeline" : "cards"
  }

  getStatusClass(status: string): string {
    const classes = {
      pending: "tag-warning",
      processing: "tag-info",
      received: "tag-success",
      failed: "tag-danger",
      cancelled: "tag-secondary",
    }
    return classes[status as keyof typeof classes] || "tag-secondary"
  }

  getStatusLabel(status: string): string {
    const labels = {
      pending: "Pendente",
      processing: "Processando",
      received: "Recebido",
      failed: "Falhou",
      cancelled: "Cancelado",
    }
    return labels[status as keyof typeof labels] || status
  }

  getPriorityClass(priority: string): string {
    const classes = {
      low: "tag-secondary",
      normal: "tag-info",
      high: "tag-warning",
      urgent: "tag-danger",
    }
    return classes[priority as keyof typeof classes] || "tag-secondary"
  }

  getPriorityLabel(priority: string): string {
    const labels = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    }
    return labels[priority as keyof typeof labels] || priority
  }

  getPaymentMethodLabel(method: string): string {
    const labels = {
      pix: "PIX",
      ted: "TED",
      transfer: "Transferência",
      boleto: "Boleto",
      card: "Cartão",
    }
    return labels[method as keyof typeof labels] || method
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
}
