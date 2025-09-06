import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { ApiCredential, CreateCredentialRequest, ApiPermission } from "../../interfaces/api-credentials.interface"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-api-credentials",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, CustomDialogComponent],
  templateUrl: "./api-credentials.component.html",
  styleUrls: ["./api-credentials.component.scss"],
})
export class ApiCredentialsComponent implements OnInit {
  credentials: ApiCredential[] = []
  selectedCredential: ApiCredential | null = null

  // Dialog states
  createCredentialDialogVisible = false
  viewCredentialDialogVisible = false
  editCredentialDialogVisible = false
  revokeCredentialDialogVisible = false

  // Form data
  createCredentialForm: CreateCredentialRequest = {
    name: "",
    description: "",
    permissions: [],
    environment: "sandbox",
    rateLimit: 1000,
    ipWhitelist: [],
  }

  editCredentialForm: Partial<ApiCredential> = {}

  // Available permissions
  availablePermissions: ApiPermission[] = [
    {
      resource: "transactions",
      actions: ["read", "create"],
      description: "Gerenciar transações",
    },
    {
      resource: "users",
      actions: ["read", "create", "update"],
      description: "Gerenciar usuários",
    },
    {
      resource: "payments",
      actions: ["read", "create", "cancel"],
      description: "Processar pagamentos",
    },
    {
      resource: "webhooks",
      actions: ["read", "create", "update", "delete"],
      description: "Configurar webhooks",
    },
    {
      resource: "reports",
      actions: ["read", "export"],
      description: "Acessar relatórios",
    },
  ]

  // Temporary IP for whitelist
  newIpAddress = ""

  // Copy feedback
  copyFeedback = ""

  ngOnInit() {
    this.loadCredentials()
  }

  loadCredentials() {
    // Mock data
    this.credentials = [
      {
        id: "1",
        name: "Produção Principal",
        description: "Chave principal para ambiente de produção",
        apiKey: "pk_live_1234567890abcdef",
        secretKey: "sk_live_abcdef1234567890",
        status: "active",
        permissions: [
          { resource: "transactions", actions: ["read", "create"], description: "Gerenciar transações" },
          { resource: "payments", actions: ["read", "create"], description: "Processar pagamentos" },
        ],
        environment: "production",
        createdAt: new Date("2024-01-15"),
        lastUsed: new Date("2024-01-20T10:30:00"),
        expiresAt: null,
        usageCount: 15420,
        rateLimit: 5000,
        ipWhitelist: ["192.168.1.100", "10.0.0.50"],
      },
      {
        id: "2",
        name: "Desenvolvimento",
        description: "Chave para testes e desenvolvimento",
        apiKey: "pk_test_9876543210fedcba",
        secretKey: "sk_test_fedcba0987654321",
        status: "active",
        permissions: [
          { resource: "transactions", actions: ["read"], description: "Visualizar transações" },
          { resource: "users", actions: ["read"], description: "Visualizar usuários" },
        ],
        environment: "sandbox",
        createdAt: new Date("2024-01-10"),
        lastUsed: new Date("2024-01-19T15:45:00"),
        expiresAt: new Date("2024-12-31"),
        usageCount: 892,
        rateLimit: 1000,
        ipWhitelist: [],
      },
      {
        id: "3",
        name: "Webhook Service",
        description: "Chave específica para serviço de webhooks",
        apiKey: "pk_live_webhook_abcd1234",
        secretKey: "sk_live_webhook_1234abcd",
        status: "inactive",
        permissions: [
          { resource: "webhooks", actions: ["read", "create", "update"], description: "Gerenciar webhooks" },
        ],
        environment: "production",
        createdAt: new Date("2024-01-05"),
        lastUsed: new Date("2024-01-18T08:20:00"),
        expiresAt: null,
        usageCount: 2341,
        rateLimit: 2000,
        ipWhitelist: ["203.0.113.10"],
      },
    ]
  }

  openCreateDialog() {
    this.createCredentialForm = {
      name: "",
      description: "",
      permissions: [],
      environment: "sandbox",
      rateLimit: 1000,
      ipWhitelist: [],
    }
    this.newIpAddress = ""
    this.createCredentialDialogVisible = true
  }

  openViewDialog(credential: ApiCredential) {
    this.selectedCredential = credential
    this.viewCredentialDialogVisible = true
  }

  openEditDialog(credential: ApiCredential) {
    this.selectedCredential = credential
    this.editCredentialForm = {
      name: credential.name,
      description: credential.description,
      rateLimit: credential.rateLimit,
      ipWhitelist: [...credential.ipWhitelist],
    }
    this.newIpAddress = ""
    this.editCredentialDialogVisible = true
  }

  openRevokeDialog(credential: ApiCredential) {
    this.selectedCredential = credential
    this.revokeCredentialDialogVisible = true
  }

  handleCreateDialogAction(action: any) {
    if (action.id === "create") {
      this.createCredential()
    } else if (action.id === "cancel") {
      this.createCredentialDialogVisible = false
    }
  }

  handleViewDialogAction(action: any) {
    if (action.id === "close") {
      this.viewCredentialDialogVisible = false
      this.selectedCredential = null
    }
  }

  handleEditDialogAction(action: any) {
    if (action.id === "save") {
      this.updateCredential()
    } else if (action.id === "cancel") {
      this.editCredentialDialogVisible = false
      this.selectedCredential = null
    }
  }

  handleRevokeDialogAction(action: any) {
    if (action.id === "revoke") {
      this.revokeCredential()
    } else if (action.id === "cancel") {
      this.revokeCredentialDialogVisible = false
      this.selectedCredential = null
    }
  }

  createCredential() {
    const newCredential: ApiCredential = {
      id: Date.now().toString(),
      name: this.createCredentialForm.name,
      description: this.createCredentialForm.description,
      apiKey: this.generateApiKey(this.createCredentialForm.environment),
      secretKey: this.generateSecretKey(this.createCredentialForm.environment),
      status: "active",
      permissions: this.availablePermissions.filter((p) => this.createCredentialForm.permissions.includes(p.resource)),
      environment: this.createCredentialForm.environment,
      createdAt: new Date(),
      lastUsed: null,
      expiresAt: this.createCredentialForm.expiresAt || null,
      usageCount: 0,
      rateLimit: this.createCredentialForm.rateLimit,
      ipWhitelist: [...this.createCredentialForm.ipWhitelist],
    }

    this.credentials.unshift(newCredential)
    this.createCredentialDialogVisible = false
    console.log("Credencial criada:", newCredential)
  }

  updateCredential() {
    if (this.selectedCredential && this.editCredentialForm) {
      const index = this.credentials.findIndex((c) => c.id === this.selectedCredential!.id)
      if (index !== -1) {
        this.credentials[index] = {
          ...this.credentials[index],
          name: this.editCredentialForm.name || this.credentials[index].name,
          description: this.editCredentialForm.description || this.credentials[index].description,
          rateLimit: this.editCredentialForm.rateLimit || this.credentials[index].rateLimit,
          ipWhitelist: this.editCredentialForm.ipWhitelist || this.credentials[index].ipWhitelist,
        }
      }
    }

    this.editCredentialDialogVisible = false
    this.selectedCredential = null
    console.log("Credencial atualizada")
  }

  revokeCredential() {
    if (this.selectedCredential) {
      const index = this.credentials.findIndex((c) => c.id === this.selectedCredential!.id)
      if (index !== -1) {
        this.credentials[index].status = "revoked"
      }
    }

    this.revokeCredentialDialogVisible = false
    this.selectedCredential = null
    console.log("Credencial revogada")
  }

  toggleCredentialStatus(credential: ApiCredential) {
    if (credential.status === "revoked") return

    credential.status = credential.status === "active" ? "inactive" : "active"
    console.log(`Status da credencial ${credential.name} alterado para ${credential.status}`)
  }

  regenerateKeys(credential: ApiCredential) {
    credential.apiKey = this.generateApiKey(credential.environment)
    credential.secretKey = this.generateSecretKey(credential.environment)
    console.log("Chaves regeneradas para:", credential.name)
  }

  copyToClipboard(text: string, type: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.copyFeedback = `${type} copiada!`
        setTimeout(() => {
          this.copyFeedback = ""
        }, 2000)
      })
      .catch(() => {
        this.copyFeedback = "Erro ao copiar"
        setTimeout(() => {
          this.copyFeedback = ""
        }, 2000)
      })
  }

  addIpToWhitelist(ipList: string[]) {
    if (this.newIpAddress && !ipList.includes(this.newIpAddress)) {
      ipList.push(this.newIpAddress)
      this.newIpAddress = ""
    }
  }

  removeIpFromWhitelist(ipList: string[], ip: string) {
    const index = ipList.indexOf(ip)
    if (index > -1) {
      ipList.splice(index, 1)
    }
  }

  togglePermission(permission: string) {
    const index = this.createCredentialForm.permissions.indexOf(permission)
    if (index > -1) {
      this.createCredentialForm.permissions.splice(index, 1)
    } else {
      this.createCredentialForm.permissions.push(permission)
    }
  }

  hasPermission(permission: string): boolean {
    return this.createCredentialForm.permissions.includes(permission)
  }

  private generateApiKey(environment: string): string {
    const prefix = environment === "production" ? "pk_live_" : "pk_test_"
    const random = Math.random().toString(36).substring(2, 18)
    return prefix + random
  }

  private generateSecretKey(environment: string): string {
    const prefix = environment === "production" ? "sk_live_" : "sk_test_"
    const random = Math.random().toString(36).substring(2, 18)
    return prefix + random
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      active: "status-active",
      inactive: "status-inactive",
      revoked: "status-revoked",
    }
    return statusClasses[status as keyof typeof statusClasses] || ""
  }

  getEnvironmentClass(environment: string): string {
    return environment === "production" ? "env-production" : "env-sandbox"
  }

  formatDate(date: Date | null): string {
    if (!date) return "Nunca"
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat("pt-BR").format(num)
  }

  maskKey(key: string): string {
    if (key.length <= 8) return key
    return key.substring(0, 8) + "•".repeat(key.length - 12) + key.substring(key.length - 4)
  }
}
