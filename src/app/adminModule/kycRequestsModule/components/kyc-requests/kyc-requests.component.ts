import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { KycRequest, KycDocument, KycMetrics } from "../../interfaces/kyc-requests.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component";
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component";
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component";
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component";
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component";

@Component({
  selector: "app-kyc-requests",
  standalone: true,
  imports: [CommonModule, FormsModule, CustomDialogComponent, SummaryCardComponent, FilterTabsComponent, UserMenuComponent, SidebarFiltersComponent],
  templateUrl: "./kyc-requests.component.html",
  styleUrls: ["./kyc-requests.component.scss"],
})
export class KycRequestsComponent implements OnInit {
  kycRequests: KycRequest[] = [
    {
      id: "1",
      companyName: "Tech Solutions Ltda",
      companyDocument: "12.345.678/0001-90",
      requestDate: new Date("2024-01-15"),
      status: "pending",
      priority: "high",
      assignedTo: "João Silva",
      documents: [
        {
          id: "doc1",
          name: "Contrato Social",
          type: "PDF",
          url: "/documents/contrato-social.pdf",
          uploadDate: new Date("2024-01-15"),
          status: "approved",
        },
        {
          id: "doc2",
          name: "Cartão CNPJ",
          type: "PDF",
          url: "/documents/cartao-cnpj.pdf",
          uploadDate: new Date("2024-01-15"),
          status: "pending",
        },
        {
          id: "doc3",
          name: "Comprovante de Endereço",
          type: "PDF",
          url: "/documents/comprovante-endereco.pdf",
          uploadDate: new Date("2024-01-15"),
          status: "rejected",
        },
      ],
      lastUpdate: new Date(),
      notes: "Documentação completa enviada",
    },
    {
      id: "2",
      companyName: "Digital Commerce SA",
      companyDocument: "98.765.432/0001-10",
      requestDate: new Date("2024-01-14"),
      status: "under_review",
      priority: "medium",
      assignedTo: "Maria Santos",
      documents: [
        {
          id: "doc4",
          name: "Contrato Social",
          type: "PDF",
          url: "/documents/contrato-social.pdf",
          uploadDate: new Date("2024-01-14"),
          status: "pending",
        },
        {
          id: "doc5",
          name: "Cartão CNPJ",
          type: "PDF",
          url: "/documents/cartao-cnpj.pdf",
          uploadDate: new Date("2024-01-14"),
          status: "approved",
        },
        {
          id: "doc6",
          name: "Comprovante de Endereço",
          type: "PDF",
          url: "/documents/comprovante-endereco.pdf",
          uploadDate: new Date("2024-01-14"),
          status: "rejected",
        },
      ],
      lastUpdate: new Date(),
      notes: "Aguardando documentos adicionais",
    },
    {
      id: "3",
      companyName: "Innovation Corp",
      companyDocument: "11.222.333/0001-44",
      requestDate: new Date("2024-01-13"),
      status: "approved",
      priority: "low",
      assignedTo: "Carlos Lima",
      documents: [
        {
          id: "doc7",
          name: "Contrato Social",
          type: "PDF",
          url: "/documents/contrato-social.pdf",
          uploadDate: new Date("2024-01-13"),
          status: "approved",
        },
        {
          id: "doc8",
          name: "Cartão CNPJ",
          type: "PDF",
          url: "/documents/cartao-cnpj.pdf",
          uploadDate: new Date("2024-01-13"),
          status: "pending",
        },
        {
          id: "doc9",
          name: "Comprovante de Endereço",
          type: "PDF",
          url: "/documents/comprovante-endereco.pdf",
          uploadDate: new Date("2024-01-13"),
          status: "rejected",
        },
      ],
      lastUpdate: new Date(),
      notes: "Aprovado com sucesso",
    },
    {
      id: "4",
      companyName: "StartUp Brasil",
      companyDocument: "55.666.777/0001-88",
      requestDate: new Date("2024-01-12"),
      status: "rejected",
      priority: "medium",
      assignedTo: "Ana Costa",
      documents: [
        {
          id: "doc10",
          name: "Contrato Social",
          type: "PDF",
          url: "/documents/contrato-social.pdf",
          uploadDate: new Date("2024-01-12"),
          status: "approved",
        },
        {
          id: "doc11",
          name: "Cartão CNPJ",
          type: "PDF",
          url: "/documents/cartao-cnpj.pdf",
          uploadDate: new Date("2024-01-12"),
          status: "pending",
        },
        {
          id: "doc12",
          name: "Comprovante de Endereço",
          type: "PDF",
          url: "/documents/comprovante-endereco.pdf",
          uploadDate: new Date("2024-01-12"),
          status: "rejected",
        },
      ],
      lastUpdate: new Date(),
      notes: "Documentação incompleta",
    },
    {
      id: "5",
      companyName: "Future Tech Ltda",
      companyDocument: "99.888.777/0001-66",
      requestDate: new Date("2024-01-11"),
      status: "pending",
      priority: "urgent",
      assignedTo: "Pedro Oliveira",
      documents: [
        {
          id: "doc13",
          name: "Contrato Social",
          type: "PDF",
          url: "/documents/contrato-social.pdf",
          uploadDate: new Date("2024-01-11"),
          status: "approved",
        },
        {
          id: "doc14",
          name: "Cartão CNPJ",
          type: "PDF",
          url: "/documents/cartao-cnpj.pdf",
          uploadDate: new Date("2024-01-11"),
          status: "pending",
        },
        {
          id: "doc15",
          name: "Comprovante de Endereço",
          type: "PDF",
          url: "/documents/comprovante-endereco.pdf",
          uploadDate: new Date("2024-01-11"),
          status: "rejected",
        },
      ],
      lastUpdate: new Date(),
      notes: "Solicitação urgente",
    },
  ]

  filteredRequests: KycRequest[] = []
  sidebarVisible = false
  documentsDialogVisible = false
  selectedDocuments: KycDocument[] = []

  filters = {
    search: "",
    status: "",
    companyName: "",
    priority: "",
    assignedTo: "",
    period: "all",
    documentType: "",
    region: "",
    minAmount: null as number | null,
    maxAmount: null as number | null,
    dateFrom: "",
    dateTo: "",
  }

  metrics: KycMetrics = {
    totalRequests: 156,
    pendingRequests: 23,
    approvedRequests: 120,
    rejectedRequests: 13,
    averageProcessingTime: 3.5,
  }

  selectedRequest: KycRequest | null = null
  requestDialogVisible = false
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  constructor() {}

  ngOnInit(): void {
    this.loadKycRequests()
    this.applyFilters()
  }

  loadKycRequests(): void {
    this.filteredRequests = [...this.kycRequests]
    this.totalItems = this.filteredRequests.length
  }

  setStatus(status: string): void {
    this.filters.status = status
    this.applyFilters()
  }

  applyFilters(): void {
    this.filteredRequests = this.kycRequests.filter((request) => {
      // Filtro por status
      if (this.filters.status && request.status !== this.filters.status) {
        return false
      }

      // Filtro por busca
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase()
        return (
          request.companyName.toLowerCase().includes(searchTerm) ||
          request.companyDocument.includes(searchTerm) ||
          request.assignedTo?.toLowerCase().includes(searchTerm)
        )
      }

      // Filtro por nome da empresa
      if (this.filters.companyName) {
        const companyTerm = this.filters.companyName.toLowerCase()
        return request.companyName.toLowerCase().includes(companyTerm)
      }

      // Filtro por prioridade
      if (this.filters.priority && request.priority !== this.filters.priority) {
        return false
      }

      // Filtro por responsável
      if (this.filters.assignedTo) {
        const assignedTerm = this.filters.assignedTo.toLowerCase()
        return request.assignedTo?.toLowerCase().includes(assignedTerm)
      }

      return true
    })

    this.totalItems = this.filteredRequests.length
    this.currentPage = 1
    this.updateMetrics()
  }

  clearFilters(): void {
    this.filters = {
      search: "",
      status: "",
      companyName: "",
      priority: "",
      assignedTo: "",
      period: "all",
      documentType: "",
      region: "",
      minAmount: null,
      maxAmount: null,
      dateFrom: "",
      dateTo: "",
    }
    this.applyFilters()
  }

  updateMetrics(): void {
    const pending = this.filteredRequests.filter((r) => r.status === "pending").length
    const approved = this.filteredRequests.filter((r) => r.status === "approved").length
    const rejected = this.filteredRequests.filter((r) => r.status === "rejected").length

    this.metrics = {
      totalRequests: this.filteredRequests.length,
      pendingRequests: pending,
      approvedRequests: approved,
      rejectedRequests: rejected,
      averageProcessingTime: 3.5,
    }
  }

  exportCSV(): void {
    console.log("Exportando CSV...")
    // Implementar exportação CSV
  }

  viewRequest(request: KycRequest): void {
    this.selectedRequest = request
    this.requestDialogVisible = true
  }

  handleDialogAction(action: any): void {
    if (action.id === "approve") {
      this.approveRequest()
    } else if (action.id === "reject") {
      this.rejectRequest()
    } else if (action.id === "close") {
      this.requestDialogVisible = false
    }
  }

  approveRequest(): void {
    if (this.selectedRequest) {
      this.selectedRequest.status = "approved"
      this.selectedRequest.lastUpdate = new Date()
      this.requestDialogVisible = false
      this.loadKycRequests()
      this.applyFilters()
    }
  }

  rejectRequest(): void {
    if (this.selectedRequest) {
      this.selectedRequest.status = "rejected"
      this.selectedRequest.lastUpdate = new Date()
      this.requestDialogVisible = false
      this.loadKycRequests()
      this.applyFilters()
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "approved":
        return "status-success"
      case "rejected":
        return "status-error"
      case "under_review":
        return "status-info"
      case "pending":
        return "status-warning"
      default:
        return ""
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "rejected":
        return "Rejeitado"
      case "under_review":
        return "Em Análise"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case "urgent":
        return "priority-urgent"
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return ""
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case "urgent":
        return "Urgente"
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return priority
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  fmt(value: number, type: string, min?: number, max?: number): string {
    switch (type) {
      case "int":
        return value.toLocaleString("pt-BR")
      case "percent":
        return (value / 100).toLocaleString("pt-BR", {
          style: "percent",
          minimumFractionDigits: min || 0,
          maximumFractionDigits: max || 2,
        })
      case "currency":
        return value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      default:
        return value.toString()
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page
  }

  get paginatedRequests(): KycRequest[] {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredRequests.slice(start, end)
  }

  viewDocuments(request: KycRequest): void {
    this.selectedDocuments = request.documents
    this.documentsDialogVisible = true
  }
countByStatus(status: 'approved' | 'pending' | 'rejected'): number {
  return this.selectedDocuments.reduce((acc, d) => acc + (d.status === status ? 1 : 0), 0);
  }
  trackDoc = (_: number, doc: KycDocument) => doc.id;

downloadDocument(doc: KycDocument): void {
  const link = document.createElement('a'); // agora usa o global correto
  link.href = doc.url;
  link.download = doc.name;
  link.click();
  link.remove();
}

  approveDocument(document: KycDocument): void {
    document.status = "approved"
    console.log(`Documento aprovado: ${document.name}`)
  }

  rejectDocument(document: KycDocument): void {
    document.status = "rejected"
    console.log(`Documento rejeitado: ${document.name}`)
  }

  getDocumentStatusClass(status: string): string {
    switch (status) {
      case "approved":
        return "status-success"
      case "rejected":
        return "status-error"
      case "pending":
        return "status-warning"
      default:
        return ""
    }
  }

  getDocumentStatusLabel(status: string): string {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "rejected":
        return "Rejeitado"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }
}
