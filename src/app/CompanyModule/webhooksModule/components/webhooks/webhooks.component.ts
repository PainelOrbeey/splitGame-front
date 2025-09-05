import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type {
  Webhook,
  WebhookType,
  WebhookFilters,
  CreateWebhookRequest,
  WebhookEvent,
} from "../../interfaces/webhook.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-webhooks",
  standalone: true,
  imports: [CommonModule, PaginationComponent, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

  templateUrl: "./webhooks.component.html",
  styleUrls: ["./webhooks.component.scss"],
})
export class WebhooksComponent implements OnInit {
  webhooks: Webhook[] = []
  filteredWebhooks: Webhook[] = []
  webhookTypes: WebhookType[] = []
  filters: WebhookFilters = {}

  // Pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  // Modals
  showCreateModal = false
  showDetailsModal = false
  showEventsModal = false
  selectedWebhook: Webhook | null = null
  selectedEvents: WebhookEvent[] = []

  // Forms
  newWebhook: CreateWebhookRequest = {
    url: "",
    type: "",
    secret: "",
  }

  // Loading states
  loading = false
  creating = false
  testing = false

  ngOnInit() {
    this.loadWebhookTypes()
    this.loadWebhooks()
  }

  loadWebhookTypes() {
    this.webhookTypes = [
      {
        id: "payment",
        name: "Pagamento",
        description: "Eventos relacionados a pagamentos",
        events: ["payment.created", "payment.completed", "payment.failed"],
      },
      {
        id: "transfer",
        name: "Transferência",
        description: "Eventos de transferências bancárias",
        events: ["transfer.created", "transfer.completed", "transfer.failed"],
      },
      {
        id: "user",
        name: "Usuário",
        description: "Eventos de usuários",
        events: ["user.created", "user.updated", "user.deleted"],
      },
      {
        id: "transaction",
        name: "Transação",
        description: "Eventos de transações gerais",
        events: ["transaction.created", "transaction.updated", "transaction.cancelled"],
      },
    ]
  }

  loadWebhooks() {
    this.loading = true
    // Simulate API call
    setTimeout(() => {
      this.webhooks = [
        {
          id: "1",
          url: "https://api.example.com/webhooks/payments",
          type: this.webhookTypes[0],
          status: "ativo",
          createdAt: new Date("2024-01-15T10:30:00"),
          updatedAt: new Date("2024-01-15T10:30:00"),
          lastTriggered: new Date("2024-01-20T14:22:00"),
          events: [],
          retryCount: 0,
          maxRetries: 3,
          secret: "whsec_1234567890abcdef",
        },
        {
          id: "2",
          url: "https://webhook.site/unique-id",
          type: this.webhookTypes[1],
          status: "ativo",
          createdAt: new Date("2024-01-14T09:15:00"),
          updatedAt: new Date("2024-01-14T09:15:00"),
          lastTriggered: new Date("2024-01-19T16:45:00"),
          events: [],
          retryCount: 1,
          maxRetries: 3,
        },
        {
          id: "3",
          url: "https://api.myapp.com/webhook",
          type: this.webhookTypes[2],
          status: "erro",
          createdAt: new Date("2024-01-13T15:20:00"),
          updatedAt: new Date("2024-01-18T11:30:00"),
          lastTriggered: new Date("2024-01-18T11:30:00"),
          events: [],
          retryCount: 3,
          maxRetries: 3,
        },
      ]
      this.totalItems = this.webhooks.length
      this.applyFilters()
      this.loading = false
    }, 1000)
  }

  applyFilters() {
    this.filteredWebhooks = this.webhooks.filter((webhook) => {
      if (this.filters.status && webhook.status !== this.filters.status) return false
      if (this.filters.type && webhook.type.id !== this.filters.type) return false
      return true
    })
  }

  get paginatedWebhooks() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredWebhooks.slice(start, end)
  }

  get totalPages() {
    return Math.ceil(this.filteredWebhooks.length / this.itemsPerPage)
  }

  openCreateModal() {
    this.newWebhook = { url: "", type: "", secret: "" }
    this.showCreateModal = true
  }

  openDetailsModal(webhook: Webhook) {
    this.selectedWebhook = webhook
    this.showDetailsModal = true
  }

  openEventsModal(webhook: Webhook) {
    this.selectedWebhook = webhook
    this.loadWebhookEvents(webhook.id)
    this.showEventsModal = true
  }

  loadWebhookEvents(webhookId: string) {
    // Simulate loading events
    this.selectedEvents = [
      {
        id: "1",
        webhookId: webhookId,
        eventType: "payment.completed",
        payload: { amount: 100.0, currency: "BRL" },
        status: "success",
        responseCode: 200,
        responseBody: '{"status": "ok"}',
        createdAt: new Date("2024-01-20T14:22:00"),
      },
      {
        id: "2",
        webhookId: webhookId,
        eventType: "payment.failed",
        payload: { amount: 50.0, currency: "BRL", error: "Insufficient funds" },
        status: "failed",
        responseCode: 500,
        responseBody: '{"error": "Internal server error"}',
        createdAt: new Date("2024-01-20T13:15:00"),
        retriedAt: new Date("2024-01-20T13:20:00"),
      },
    ]
  }

  createWebhook() {
    if (!this.newWebhook.url || !this.newWebhook.type) return

    this.creating = true
    setTimeout(() => {
      const selectedType = this.webhookTypes.find((t) => t.id === this.newWebhook.type)
      if (!selectedType) return

      const newWebhook: Webhook = {
        id: Date.now().toString(),
        url: this.newWebhook.url,
        type: selectedType,
        status: "ativo",
        createdAt: new Date(),
        updatedAt: new Date(),
        events: [],
        retryCount: 0,
        maxRetries: 3,
        secret: this.newWebhook.secret || undefined,
      }

      this.webhooks.unshift(newWebhook)
      this.applyFilters()
      this.creating = false
      this.showCreateModal = false
    }, 1000)
  }

  toggleStatus(webhook: Webhook) {
    webhook.status = webhook.status === "ativo" ? "inativo" : "ativo"
    webhook.updatedAt = new Date()
  }

  deleteWebhook(webhook: Webhook) {
    if (confirm("Tem certeza que deseja excluir este webhook?")) {
      this.webhooks = this.webhooks.filter((w) => w.id !== webhook.id)
      this.applyFilters()
    }
  }

  testWebhook(webhook: Webhook) {
    this.testing = true
    // Simulate webhook test
    setTimeout(() => {
      webhook.lastTriggered = new Date()
      webhook.status = "ativo"
      this.testing = false
      // Show success message
    }, 2000)
  }

  retryWebhook(webhook: Webhook) {
    if (webhook.retryCount < webhook.maxRetries) {
      webhook.retryCount++
      webhook.lastTriggered = new Date()
      webhook.updatedAt = new Date()
    }
  }

  copyWebhookUrl(webhook: Webhook) {
    navigator.clipboard.writeText(webhook.url)
    // Show toast notification
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case "ativo":
        return "pi-check-circle"
      case "inativo":
        return "pi-pause-circle"
      case "erro":
        return "pi-exclamation-circle"
      default:
        return "pi-question-circle"
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }

  goToPage(page: number) {
    this.currentPage = page
  }
}
