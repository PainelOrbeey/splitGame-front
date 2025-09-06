import { Component, type OnInit } from "@angular/core"
import type { BillingInvoice, BillingMetrics, BillingFilters } from "../../interfaces/billing-panel.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component";
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component";

@Component({
  selector: "app-billing-panel",
  templateUrl: "./billing-panel.component.html",
  styleUrls: ["./billing-panel.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SidebarFiltersComponent, PaginationComponent, CustomDialogComponent, SummaryCardComponent],
})
export class BillingPanelComponent implements OnInit {
  // Metrics
  metrics: BillingMetrics = {
    totalInvoices: 8,
    currentInvoiceAmount: 0.94,
    totalPaidAmount: 93.86,
    pendingAmount: 4302.36,
    totalRevenue: 4396.22,
    averageInvoiceValue: 549.53,
  }

  // Current Invoice
  currentInvoice: BillingInvoice = {
    id: "current",
    invoiceNumber: "FATURA-ATUAL",
    period: "Período de 25/08/2025 a 31/08/2025",
    issueDate: new Date("2025-08-25"),
    dueDate: new Date("2025-09-03"),
    amount: 0.94,
    status: "pending",
    paymentMethods: [
      {
        type: "pix",
        amount: 0.94,
        percentage: 100.0,
        totalPaid: 93.86,
      },
      {
        type: "boleto",
        amount: 0.0,
        percentage: 0.0,
        totalPaid: 0.0,
      },
      {
        type: "credit_card",
        amount: 0.0,
        percentage: 0.0,
        totalPaid: 0.0,
      },
    ],
    items: [],
    tvpAmount: 0,
    additionalFees: 0,
    discounts: 0,
    downloadUrl: "",
  }

  // All Invoices
  invoices: BillingInvoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2025-001",
      period: "Período de 25/08/2025 a 31/08/2025",
      issueDate: new Date("2025-08-25"),
      dueDate: new Date("2025-09-03"),
      amount: 0.11,
      status: "pending",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "2",
      invoiceNumber: "INV-2025-002",
      period: "Período de 18/08/2025 a 24/08/2025",
      issueDate: new Date("2025-08-18"),
      dueDate: new Date("2025-08-27"),
      amount: 991.85,
      status: "pending",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "3",
      invoiceNumber: "INV-2025-003",
      period: "Período de 11/08/2025 a 17/08/2025",
      issueDate: new Date("2025-08-11"),
      dueDate: new Date("2025-08-20"),
      amount: 2760.4,
      status: "pending",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "4",
      invoiceNumber: "INV-2025-004",
      period: "Período de 04/08/2025 a 10/08/2025",
      issueDate: new Date("2025-08-04"),
      dueDate: new Date("2025-08-13"),
      amount: 550.0,
      status: "pending",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "5",
      invoiceNumber: "INV-2025-005",
      period: "Período de 28/07/2025 a 03/08/2025",
      issueDate: new Date("2025-07-28"),
      dueDate: new Date("2025-08-06"),
      amount: 5726.53,
      status: "paid",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "6",
      invoiceNumber: "INV-2025-006",
      period: "Período de 21/07/2025 a 27/07/2025",
      issueDate: new Date("2025-07-21"),
      dueDate: new Date("2025-07-30"),
      amount: 3716.16,
      status: "paid",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "7",
      invoiceNumber: "INV-2025-007",
      period: "Período de 14/07/2025 a 20/07/2025",
      issueDate: new Date("2025-07-14"),
      dueDate: new Date("2025-07-23"),
      amount: 256.52,
      status: "paid",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
    {
      id: "8",
      invoiceNumber: "INV-2025-008",
      period: "Período de 23/06/2025 a 29/06/2025",
      issueDate: new Date("2025-06-23"),
      dueDate: new Date("2025-07-02"),
      amount: 0.15,
      status: "paid",
      paymentMethods: [],
      items: [],
      tvpAmount: 0,
      additionalFees: 0,
      discounts: 0,
      downloadUrl: "",
    },
  ]

  // Filters and pagination
  filters: BillingFilters = {
    status: "",
    search: "",
    dateFrom: "",
    dateTo: "",
    minAmount: null,
    maxAmount: null,
  }

  filteredInvoices: BillingInvoice[] = []
  currentPage = 1
  itemsPerPage = 10
  totalPages = 1
  sidebarVisible = false
  detailsVisible = false
  selectedInvoice: BillingInvoice | null = null
  showPaymentModal = false

  // PIX Payment Info
  pixKey = "54.024.949/0001-50"
  whatsappNumber = "+5511999999999"

  constructor() {}

  ngOnInit(): void {
    this.applyFilters()
    this.updateMetrics()
  }

  // Formatting methods
  fmt(value: number, type: string, min = 0, max = 2): string {
    switch (type) {
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: min,
          maximumFractionDigits: max,
        }).format(value)
      case "percent":
        return new Intl.NumberFormat("pt-BR", {
          style: "percent",
          minimumFractionDigits: min,
          maximumFractionDigits: max,
        }).format(value / 100)
      case "int":
        return new Intl.NumberFormat("pt-BR").format(value)
      default:
        return value.toString()
    }
  }

  // Filter methods
  applyFilters(): void {
    this.filteredInvoices = this.invoices.filter((invoice) => {
      let matches = true

      if (this.filters.status && invoice.status !== this.filters.status) {
        matches = false
      }

      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase()
        matches =
          matches &&
          (invoice.invoiceNumber.toLowerCase().includes(searchTerm) ||
            invoice.period.toLowerCase().includes(searchTerm))
      }

      if (this.filters.dateFrom) {
        const fromDate = new Date(this.filters.dateFrom)
        matches = matches && invoice.issueDate >= fromDate
      }

      if (this.filters.dateTo) {
        const toDate = new Date(this.filters.dateTo)
        matches = matches && invoice.issueDate <= toDate
      }

      if (this.filters.minAmount !== null) {
        matches = matches && invoice.amount >= this.filters.minAmount
      }

      if (this.filters.maxAmount !== null) {
        matches = matches && invoice.amount <= this.filters.maxAmount
      }

      return matches
    })

    this.totalPages = Math.ceil(this.filteredInvoices.length / this.itemsPerPage)
    this.currentPage = 1
  }

  clearFilters(): void {
    this.filters = {
      status: "",
      search: "",
      dateFrom: "",
      dateTo: "",
      minAmount: null,
      maxAmount: null,
    }
    this.applyFilters()
  }

  setInvoiceStatus(status: string): void {
    this.filters.status = status
    this.applyFilters()
  }

  // Pagination
  getPaginatedData(): BillingInvoice[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.filteredInvoices.slice(startIndex, endIndex)
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  // Status methods
  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: "tag-warning",
      paid: "tag-success",
      overdue: "tag-danger",
      cancelled: "tag-secondary",
    }
    return statusClasses[status] || "tag-secondary"
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      pending: "Pendente",
      paid: "Pago",
      overdue: "Vencido",
      cancelled: "Cancelado",
    }
    return statusLabels[status] || status
  }

  getPaymentMethodLabel(type: string): string {
    const methodLabels: { [key: string]: string } = {
      pix: "PIX",
      boleto: "Boleto",
      credit_card: "Cartão de Crédito",
      debit_card: "Cartão de Débito",
      bank_transfer: "Transferência",
    }
    return methodLabels[type] || type
  }

  // Actions
  viewDetails(invoice: BillingInvoice): void {
    this.selectedInvoice = invoice
    this.detailsVisible = true
  }

  payInvoice(invoice: BillingInvoice): void {
    this.selectedInvoice = invoice
    this.showPaymentModal = true
  }

  downloadInvoice(invoice: BillingInvoice): void {
    // Simulate download
    console.log("Downloading invoice:", invoice.invoiceNumber)
  }

  sendWhatsApp(): void {
    const message = encodeURIComponent(
      `Olá! Gostaria de enviar o comprovante de pagamento da fatura ${this.currentInvoice.invoiceNumber} no valor de ${this.fmt(
        this.currentInvoice.amount,
        "currency",
      )}.`,
    )
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, "_blank")
  }

  copyPixKey(): void {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      alert("Chave PIX copiada para a área de transferência!")
    })
  }

  // Export
  exportCSV(): void {
    const headers = ["Número", "Período", "Data Emissão", "Vencimento", "Valor", "Status"]
    const rows = this.filteredInvoices.map((invoice) => [
      invoice.invoiceNumber,
      invoice.period,
      this.formatDate(invoice.issueDate),
      this.formatDate(invoice.dueDate),
      this.fmt(invoice.amount, "currency"),
      this.getStatusLabel(invoice.status),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    this.downloadCSV(csvContent, "faturas.csv")
  }

  private downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  public formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
  }

  // Update metrics
  updateMetrics(): void {
    const totalInvoices = this.filteredInvoices.length
    const paidInvoices = this.filteredInvoices.filter((inv) => inv.status === "paid")
    const pendingInvoices = this.filteredInvoices.filter((inv) => inv.status === "pending")

    this.metrics = {
      totalInvoices,
      currentInvoiceAmount: this.currentInvoice.amount,
      totalPaidAmount: paidInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      pendingAmount: pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      totalRevenue: this.filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      averageInvoiceValue:
        totalInvoices > 0 ? this.filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0) / totalInvoices : 0,
    }
  }

  closePaymentModal(): void {
    this.showPaymentModal = false
    this.selectedInvoice = null
  }
}
