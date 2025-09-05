import { Component, type OnInit } from "@angular/core"
import type { Transfer, TransferRequest, TransferMetrics } from "../../interfaces/transfer.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-transfers",
  templateUrl: "./transfers.component.html",
  styleUrls: ["./transfers.component.scss"],
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class TransfersComponent implements OnInit {
  // Data properties
  transfers: Transfer[] = []
  selectedTransfer: Transfer | null = null
  metrics: TransferMetrics = {
    totalTransfers: 0,
    pendingTransfers: 0,
    approvedTransfers: 0,
    rejectedTransfers: 0,
    totalAmount: 0,
    totalFees: 0,
  }

  // Dialog states
  requestTransferDialogVisible = false
  transferDetailsDialogVisible = false
  sidebarVisible = false

  // Form data
  newTransferRequest: TransferRequest = {
    destination: "",
    document: "",
    amount: 0,
    description: "",
    pixKey: "",
  }

  // Filters and pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0
  filters = {
    search: "",
    status: "",
    destination: "",
    document: "",
    isSubaccount: "",
    minAmount: null as number | null,
    maxAmount: null as number | null,
    dateFrom: "",
    dateTo: "",
    period: "all",
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.loadTransfers()
    this.updateMetrics()
  }

  loadTransfers() {
    // Simulated data
    this.transfers = [
      {
        id: "22317e0d-8dfe-46c2-9c49-ccd5ba1ddb2e",
        destination: "48.982.476/0001-00",
        document: "48.982.476/0001-00",
        status: "PENDENTE",
        transferredAmount: 5.0,
        fee: 0.0,
        isSubaccount: false,
        createdAt: new Date("2024-06-26T18:55:00"),
        updatedAt: new Date("2024-06-26T18:55:00"),
        client: "Orbeey",
        receiver: "Destino",
        pixKey: "48.982.476/0001-00",
        bankingId: "BNK123456",
        description: "Transferência PIX",
      },
      {
        id: "33428f1e-9eff-57d3-0a5a-dde6cb2eec3f",
        destination: "12.345.678/0001-90",
        document: "12.345.678/0001-90",
        status: "APROVADO",
        transferredAmount: 150.0,
        fee: 2.5,
        isSubaccount: true,
        createdAt: new Date("2024-06-25T14:30:00"),
        updatedAt: new Date("2024-06-25T15:45:00"),
        client: "Empresa ABC",
        receiver: "Fornecedor XYZ",
        pixKey: "12.345.678/0001-90",
        bankingId: "BNK789012",
        description: "Pagamento de fornecedor",
      },
      {
        id: "44539g2f-0f00-68e4-1b6b-eef7dc3ffd40",
        destination: "98.765.432/0001-10",
        document: "98.765.432/0001-10",
        status: "REJEITADO",
        transferredAmount: 75.0,
        fee: 1.5,
        isSubaccount: false,
        createdAt: new Date("2024-06-24T10:15:00"),
        updatedAt: new Date("2024-06-24T11:20:00"),
        client: "Cliente 123",
        receiver: "Beneficiário",
        description: "Transferência rejeitada por dados inválidos",
      },
    ]
    this.totalItems = this.transfers.length
  }

  updateMetrics() {
    this.metrics = {
      totalTransfers: this.transfers.length,
      pendingTransfers: this.transfers.filter((t) => t.status === "PENDENTE").length,
      approvedTransfers: this.transfers.filter((t) => t.status === "APROVADO").length,
      rejectedTransfers: this.transfers.filter((t) => t.status === "REJEITADO").length,
      totalAmount: this.transfers.reduce((sum, t) => sum + t.transferredAmount, 0),
      totalFees: this.transfers.reduce((sum, t) => sum + t.fee, 0),
    }
  }

  // Filter methods
  setStatus(status: string) {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters() {
    this.currentPage = 1
    // Filter logic would be implemented here
  }

  clearFilters() {
    this.filters = {
      search: "",
      status: "",
      destination: "",
      document: "",
      isSubaccount: "",
      minAmount: null,
      maxAmount: null,
      dateFrom: "",
      dateTo: "",
      period: "all",
    }
    this.applyFilters()
  }

  exportCSV() {
    console.log("Exporting transfers CSV...")
  }

  // Dialog actions
  openRequestTransferDialog() {
    this.newTransferRequest = {
      destination: "",
      document: "",
      amount: 0,
      description: "",
      pixKey: "",
    }
    this.requestTransferDialogVisible = true
  }

  openTransferDetails(transfer: Transfer) {
    this.selectedTransfer = transfer
    this.transferDetailsDialogVisible = true
  }

  // Form submission
  submitTransferRequest() {
    if (this.newTransferRequest.destination && this.newTransferRequest.amount > 0) {
      const newTransfer: Transfer = {
        id: this.generateId(),
        destination: this.newTransferRequest.destination,
        document: this.newTransferRequest.document,
        status: "PENDENTE",
        transferredAmount: this.newTransferRequest.amount,
        fee: this.calculateFee(this.newTransferRequest.amount),
        isSubaccount: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        client: "Cliente Atual",
        receiver: this.newTransferRequest.destination,
        pixKey: this.newTransferRequest.pixKey,
        description: this.newTransferRequest.description,
      }

      this.transfers.unshift(newTransfer)
      this.requestTransferDialogVisible = false
      this.updateMetrics()
    }
  }

  // Utility methods
  generateId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  calculateFee(amount: number): number {
    return amount * 0.01 // 1% fee
  }

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
      PENDENTE: "tag-warning",
      APROVADO: "tag-success",
      REJEITADO: "tag-danger",
      EM_PROCESSO: "tag-info",
      REEMBOLSADO: "tag-secondary",
      ERRO: "tag-danger",
    }
    return classes[status] || "tag-secondary"
  }

  get filteredTransfers(): Transfer[] {
    let filtered = [...this.transfers]

    if (this.filters.search) {
      const search = this.filters.search.toLowerCase()
      filtered = filtered.filter(
        (transfer) =>
          transfer.id.toLowerCase().includes(search) ||
          transfer.destination.toLowerCase().includes(search) ||
          transfer.client.toLowerCase().includes(search),
      )
    }

    if (this.filters.status) {
      filtered = filtered.filter((transfer) => transfer.status === this.filters.status)
    }

    if (this.filters.isSubaccount !== "") {
      const isSubaccount = this.filters.isSubaccount === "true"
      filtered = filtered.filter((transfer) => transfer.isSubaccount === isSubaccount)
    }

    if (this.filters.minAmount) {
      filtered = filtered.filter((transfer) => transfer.transferredAmount >= this.filters.minAmount!)
    }

    if (this.filters.maxAmount) {
      filtered = filtered.filter((transfer) => transfer.transferredAmount <= this.filters.maxAmount!)
    }

    return filtered
  }

  get paginatedTransfers(): Transfer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredTransfers.slice(start, start + this.itemsPerPage)
  }

  onPageChange(page: number) {
    this.currentPage = page
  }
}
