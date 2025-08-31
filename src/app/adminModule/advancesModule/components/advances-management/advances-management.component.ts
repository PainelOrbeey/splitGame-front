import { Component, type OnInit } from "@angular/core"
import type { Advance, AdvanceFilters } from "../../interfaces/advance.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-advances-management",
  templateUrl: "./advances-management.component.html",
  styleUrls: ["./advances-management.component.scss"],
  standalone: true,
    imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class AdvancesManagementComponent implements OnInit {
  advances: Advance[] = []
  filteredAdvances: Advance[] = []
  selectedAdvance: Advance | null = null
  sidebarVisible = false
  detailsVisible = false

  // Paginação
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  filters: AdvanceFilters = {
    search: "",
    status: "",
    priority: "",
    paymentMethod: "",
    minAmount: null,
    maxAmount: null,
    minRiskScore: null,
    maxRiskScore: null,
    dateFrom: "",
    dateTo: "",
    approvedBy: "",
    period: "all",
  }

  metrics = {
    totalAdvances: 0,
    totalVolume: 0,
    approvalRate: 0,
    averageAmount: 0,
    totalFees: 0,
    averageProcessingTime: 0,
  }

  ngOnInit() {
    this.loadAdvances()
    this.updateMetrics()
  }

  loadAdvances() {
    // Dados mockados para demonstração
    this.advances = [
      {
        id: "ADV001",
        companyId: "COMP001",
        companyName: "Tech Solutions Ltda",
        requestedAmount: 50000,
        approvedAmount: 45000,
        discountRate: 3.5,
        netAmount: 43425,
        status: "approved",
        priority: "high",
        requestDate: new Date("2024-01-15"),
        approvalDate: new Date("2024-01-16"),
        dueDate: new Date("2024-02-15"),
        paymentMethod: "pix",
        pixKey: "tech@solutions.com",
        documents: ["contrato.pdf", "demonstrativo.pdf"],
        reason: "Capital de giro para expansão",
        analysisNotes: "Empresa com bom histórico",
        approvedBy: "Ana Silva",
        fees: {
          processingFee: 500,
          interestRate: 2.5,
          totalFees: 1575,
        },
        receivables: {
          totalValue: 120000,
          count: 15,
          averageDays: 45,
        },
        riskScore: 85,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-16"),
      },
      {
        id: "ADV002",
        companyId: "COMP002",
        companyName: "Comércio Digital SA",
        requestedAmount: 30000,
        approvedAmount: 30000,
        discountRate: 2.8,
        netAmount: 29160,
        status: "paid",
        priority: "normal",
        requestDate: new Date("2024-01-10"),
        approvalDate: new Date("2024-01-11"),
        paymentDate: new Date("2024-01-12"),
        dueDate: new Date("2024-02-10"),
        paymentMethod: "ted",
        bankAccount: {
          bank: "Banco do Brasil",
          agency: "1234-5",
          account: "12345-6",
          accountType: "checking",
        },
        documents: ["balanco.pdf"],
        reason: "Pagamento de fornecedores",
        approvedBy: "Carlos Santos",
        fees: {
          processingFee: 300,
          interestRate: 2.0,
          totalFees: 840,
        },
        receivables: {
          totalValue: 80000,
          count: 10,
          averageDays: 30,
        },
        riskScore: 92,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-12"),
      },
      {
        id: "ADV003",
        companyId: "COMP003",
        companyName: "Indústria Moderna Ltda",
        requestedAmount: 100000,
        approvedAmount: 0,
        discountRate: 0,
        netAmount: 0,
        status: "rejected",
        priority: "low",
        requestDate: new Date("2024-01-08"),
        dueDate: new Date("2024-02-08"),
        paymentMethod: "transfer",
        documents: ["proposta.pdf"],
        reason: "Investimento em equipamentos",
        rejectionReason: "Score de risco muito baixo",
        approvedBy: "Maria Costa",
        fees: {
          processingFee: 0,
          interestRate: 0,
          totalFees: 0,
        },
        receivables: {
          totalValue: 150000,
          count: 8,
          averageDays: 60,
        },
        riskScore: 45,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-09"),
      },
    ]

    this.applyFilters()
  }

  applyFilters() {
    this.filteredAdvances = this.advances.filter((advance) => {
      const matchesSearch =
        !this.filters.search ||
        advance.id.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        advance.companyName.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || advance.status === this.filters.status
      const matchesPriority = !this.filters.priority || advance.priority === this.filters.priority
      const matchesPaymentMethod = !this.filters.paymentMethod || advance.paymentMethod === this.filters.paymentMethod

      const matchesMinAmount = !this.filters.minAmount || advance.requestedAmount >= this.filters.minAmount
      const matchesMaxAmount = !this.filters.maxAmount || advance.requestedAmount <= this.filters.maxAmount

      const matchesMinRisk = !this.filters.minRiskScore || advance.riskScore >= this.filters.minRiskScore
      const matchesMaxRisk = !this.filters.maxRiskScore || advance.riskScore <= this.filters.maxRiskScore

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesPaymentMethod &&
        matchesMinAmount &&
        matchesMaxAmount &&
        matchesMinRisk &&
        matchesMaxRisk
      )
    })

    this.totalItems = this.filteredAdvances.length
    this.updateMetrics()
  }

  updateMetrics() {
    const advances = this.filteredAdvances

    this.metrics = {
      totalAdvances: advances.length,
      totalVolume: advances.reduce((sum, adv) => sum + adv.requestedAmount, 0),
      approvalRate:
        advances.length > 0
          ? (advances.filter((adv) => adv.status === "approved" || adv.status === "paid").length / advances.length) *
            100
          : 0,
      averageAmount:
        advances.length > 0 ? advances.reduce((sum, adv) => sum + adv.requestedAmount, 0) / advances.length : 0,
      totalFees: advances.reduce((sum, adv) => sum + adv.fees.totalFees, 0),
      averageProcessingTime: 2.5, // Mockado
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
      priority: "",
      paymentMethod: "",
      minAmount: null,
      maxAmount: null,
      minRiskScore: null,
      maxRiskScore: null,
      dateFrom: "",
      dateTo: "",
      approvedBy: "",
      period: "all",
    }
    this.applyFilters()
  }

  viewDetails(advance: Advance) {
    this.selectedAdvance = advance
    this.detailsVisible = true
  }

  exportCSV() {
    console.log("Exportando CSV das antecipações...")
  }

  fmt(value: number, type: "currency" | "int" | "percent", min = 0, max = 2): string {
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
      return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: min,
        maximumFractionDigits: max,
      }).format(value)
    }
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: "warning",
      analyzing: "info",
      approved: "success",
      rejected: "danger",
      paid: "success",
      cancelled: "secondary",
    }
    return statusClasses[status] || "secondary"
  }

  getPriorityClass(priority: string): string {
    const priorityClasses: { [key: string]: string } = {
      low: "secondary",
      normal: "info",
      high: "warning",
      urgent: "danger",
    }
    return priorityClasses[priority] || "secondary"
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      pending: "Pendente",
      analyzing: "Em Análise",
      approved: "Aprovada",
      rejected: "Rejeitada",
      paid: "Paga",
      cancelled: "Cancelada",
    }
    return statusLabels[status] || status
  }

  getPriorityLabel(priority: string): string {
    const priorityLabels: { [key: string]: string } = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    }
    return priorityLabels[priority] || priority
  }

  getPaymentMethodLabel(method: string): string {
    const methodLabels: { [key: string]: string } = {
      pix: "PIX",
      ted: "TED",
      transfer: "Transferência",
      check: "Cheque",
    }
    return methodLabels[method] || method
  }

  get paginatedAdvances(): Advance[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredAdvances.slice(start, end)
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }
}
