import { Component, type OnInit } from "@angular/core"
import type { Company, CompanyUser, CompanySettings } from "../../interfaces/company.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-my-company",
  templateUrl: "./my-company.component.html",
  styleUrls: ["./my-company.component.scss"],
      standalone: true,
        imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class MyCompanyComponent implements OnInit {
  company!: Company
  activeTab: "info" | "settings" | "team" | "documents" | "billing" = "info"

  // UI States
  editMode = false
  loading = false
  saveSuccess = false

  // Forms
  companyForm: any = {}
  settingsForm: CompanySettings | null = null
  newUser: Partial<CompanyUser> = {}

  // Modals
  addUserVisible = false
  uploadDocumentVisible = false
  confirmDeleteVisible = false
  selectedUser: CompanyUser | null = null

  ngOnInit() {
    this.loadCompanyData()
  }

  loadCompanyData() {
    // Simulated company data
    this.company = {
      id: "COMP001",
      name: "TechCorp Soluções Ltda",
      tradeName: "TechCorp",
      document: "12.345.678/0001-90",
      documentType: "cnpj",
      email: "contato@techcorp.com",
      phone: "(11) 99999-9999",
      website: "https://techcorp.com",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
      status: "active",
      plan: "premium",
      createdDate: new Date("2023-01-15"),
      lastUpdate: new Date(),
      address: {
        street: "Av. Paulista",
        number: "1000",
        complement: "Sala 1001",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100",
        country: "Brasil",
      },
      bankAccount: {
        bank: "Banco do Brasil",
        bankCode: "001",
        agency: "1234",
        account: "56789-0",
        accountType: "checking",
        accountHolder: "TechCorp Soluções Ltda",
        pixKey: "contato@techcorp.com",
      },
      settings: {
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
        security: {
          twoFactor: true,
          ipWhitelist: ["192.168.1.1", "10.0.0.1"],
          sessionTimeout: 30,
        },
        billing: {
          autoPayment: true,
          invoiceEmail: "financeiro@techcorp.com",
          paymentMethod: "card",
        },
        integrations: {
          webhook: {
            enabled: true,
            url: "https://techcorp.com/webhook",
            events: ["payment.success", "payment.failed"],
          },
          api: {
            enabled: true,
            rateLimit: 1000,
          },
        },
      },
      metrics: {
        totalTransactions: 15420,
        totalVolume: 2850000,
        monthlyVolume: 185000,
        averageTicket: 184.75,
        successRate: 98.5,
      },
      team: [
        {
          id: "USER001",
          name: "João Silva",
          email: "joao@techcorp.com",
          role: "admin",
          status: "active",
          permissions: ["all"],
          lastAccess: new Date("2024-01-15T10:30:00"),
          createdDate: new Date("2023-01-15"),
        },
        {
          id: "USER002",
          name: "Maria Santos",
          email: "maria@techcorp.com",
          role: "manager",
          status: "active",
          permissions: ["transactions", "reports"],
          lastAccess: new Date("2024-01-14T16:45:00"),
          createdDate: new Date("2023-03-20"),
        },
      ],
      documents: [
        {
          id: "DOC001",
          type: "cnpj",
          name: "Cartão CNPJ",
          url: "/documents/cnpj.pdf",
          status: "approved",
          uploadDate: new Date("2023-01-15"),
          expiryDate: new Date("2025-01-15"),
        },
        {
          id: "DOC002",
          type: "contract",
          name: "Contrato de Prestação de Serviços",
          url: "/documents/contract.pdf",
          status: "approved",
          uploadDate: new Date("2023-01-20"),
        },
      ],
    }

    this.companyForm = { ...this.company }
    this.settingsForm = { ...this.company.settings }
  }

  setActiveTab(tab: "info" | "settings" | "team" | "documents" | "billing") {
    this.activeTab = tab
    this.editMode = false
  }

  toggleEditMode() {
    this.editMode = !this.editMode
    if (!this.editMode) {
      // Reset form
      this.companyForm = { ...this.company }
    }
  }

  saveCompanyInfo() {
    this.loading = true

    // Simulate API call
    setTimeout(() => {
      if (this.company) {
        Object.assign(this.company, this.companyForm)
        this.company.lastUpdate = new Date()
      }

      this.loading = false
      this.editMode = false
      this.saveSuccess = true

      setTimeout(() => {
        this.saveSuccess = false
      }, 3000)
    }, 1000)
  }

  saveSettings() {
    this.loading = true

    // Simulate API call
    setTimeout(() => {
      if (this.company && this.settingsForm) {
        this.company.settings = { ...this.settingsForm }
        this.company.lastUpdate = new Date()
      }

      this.loading = false
      this.saveSuccess = true

      setTimeout(() => {
        this.saveSuccess = false
      }, 3000)
    }, 1000)
  }

  addUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.role) {
      const user: CompanyUser = {
        id: "USER" + Date.now().toString().slice(-3),
        name: this.newUser.name,
        email: this.newUser.email,
        role: this.newUser.role as any,
        status: "pending",
        permissions: this.getDefaultPermissions(this.newUser.role as any),
        createdDate: new Date(),
      }

      this.company?.team.push(user)
      this.newUser = {}
      this.addUserVisible = false
    }
  }

  removeUser(user: CompanyUser) {
    this.selectedUser = user
    this.confirmDeleteVisible = true
  }

  confirmRemoveUser() {
    if (this.company && this.selectedUser) {
      const index = this.company.team.findIndex((u) => u.id === this.selectedUser!.id)
      if (index > -1) {
        this.company.team.splice(index, 1)
      }
    }
    this.confirmDeleteVisible = false
    this.selectedUser = null
  }

  getDefaultPermissions(role: string): string[] {
    const permissions = {
      admin: ["all"],
      manager: ["transactions", "reports", "team"],
      operator: ["transactions"],
      viewer: ["reports"],
    }
    return permissions[role as keyof typeof permissions] || []
  }

  getRoleLabel(role: string): string {
    const labels = {
      admin: "Administrador",
      manager: "Gerente",
      operator: "Operador",
      viewer: "Visualizador",
    }
    return labels[role as keyof typeof labels] || role
  }

  getStatusClass(status: string): string {
    const classes = {
      active: "tag-success",
      inactive: "tag-secondary",
      pending: "tag-warning",
      blocked: "tag-danger",
      approved: "tag-success",
      rejected: "tag-danger",
    }
    return classes[status as keyof typeof classes] || "tag-secondary"
  }

  getStatusLabel(status: string): string {
    const labels = {
      active: "Ativo",
      inactive: "Inativo",
      pending: "Pendente",
      blocked: "Bloqueado",
      approved: "Aprovado",
      rejected: "Rejeitado",
    }
    return labels[status as keyof typeof labels] || status
  }

  getPlanLabel(plan: string): string {
    const labels = {
      basic: "Básico",
      premium: "Premium",
      enterprise: "Enterprise",
    }
    return labels[plan as keyof typeof labels] || plan
  }

  getPlanClass(plan: string): string {
    const classes = {
      basic: "tag-secondary",
      premium: "tag-info",
      enterprise: "tag-warning",
    }
    return classes[plan as keyof typeof classes] || "tag-secondary"
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
