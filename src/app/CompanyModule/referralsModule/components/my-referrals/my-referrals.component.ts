import { Component, type OnInit } from "@angular/core"
import type { Referral, ReferralMetrics, ReferralFilters } from "../../interfaces/referral.interface"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

@Component({
  selector: "app-my-referrals",
  templateUrl: "./my-referrals.component.html",
  styleUrls: ["./my-referrals.component.scss"],
  standalone: true,
        imports: [CommonModule, DialogModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],

})
export class MyReferralsComponent implements OnInit {
  referrals: Referral[] = []
  filteredReferrals: Referral[] = []
  paginatedReferrals: Referral[] = []
  selectedReferral: Referral | null = null

  metrics: ReferralMetrics = {
    totalReferrals: 0,
    activeReferrals: 0,
    pendingReferrals: 0,
    totalCommissions: 0,
    monthlyCommissions: 0,
    conversionRate: 0,
    averageCommissionPerReferral: 0,
    totalVolume: 0,
    averageTicket: 0,
    retentionRate: 0,
  }

  filters: ReferralFilters = {
    search: "",
    status: "",
    kycStatus: "",
    source: "",
    level: "",
    minCommissions: null,
    maxCommissions: null,
    minVolume: null,
    maxVolume: null,
    minRiskScore: null,
    maxRiskScore: null,
    period: "all",
    dateFrom: "",
    dateTo: "",
    tags: [],
    hasTransactions: null,
  }

  // Pagination
  currentPage = 1
  itemsPerPage = 20
  totalPages = 0

  // UI States
  sidebarVisible = false
  detailsVisible = false
  loading = false

  ngOnInit() {
    this.loadReferrals()
    this.updateMetrics()
  }

  loadReferrals() {
    this.loading = true

    // Simulated data - replace with actual API call
    this.referrals = [
      {
        id: "REF001",
        referredName: "João Silva Santos",
        referredEmail: "joao.silva@email.com",
        referredPhone: "(11) 99999-1234",
        referredDocument: "123.456.789-01",
        referrerName: "Maria Oliveira",
        referrerId: "USR001",
        status: "active",
        registrationDate: new Date("2024-01-15"),
        activationDate: new Date("2024-01-16"),
        lastActivityDate: new Date("2024-12-01"),
        commissionRate: 2.5,
        totalCommissions: 15420.5,
        totalTransactions: 156,
        totalVolume: 617820.0,
        level: 1,
        source: "direct",
        kycStatus: "approved",
        riskScore: 85,
        tags: ["premium", "high-volume"],
        contact: {
          preferredMethod: "whatsapp",
          lastContact: new Date("2024-11-28"),
          contactCount: 12,
        },
        performance: {
          conversionRate: 78.5,
          averageTicket: 3960.0,
          retentionRate: 92.3,
          monthlyGrowth: 15.2,
        },
        address: {
          street: "Rua das Flores",
          number: "123",
          complement: "Apto 45",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zipCode: "01234-567",
        },
        bankAccount: {
          bank: "Banco do Brasil",
          agency: "1234",
          account: "56789-0",
          accountType: "checking",
          pixKey: "joao.silva@email.com",
        },
      },
      {
        id: "REF002",
        referredName: "Ana Costa Lima",
        referredEmail: "ana.costa@email.com",
        referredPhone: "(11) 98888-5678",
        referredDocument: "987.654.321-09",
        referrerName: "Carlos Mendes",
        referrerId: "USR002",
        status: "pending",
        registrationDate: new Date("2024-11-25"),
        commissionRate: 2.0,
        totalCommissions: 0,
        totalTransactions: 0,
        totalVolume: 0,
        level: 1,
        source: "social",
        kycStatus: "pending",
        riskScore: 65,
        tags: ["new"],
        contact: {
          preferredMethod: "email",
          contactCount: 3,
        },
        performance: {
          conversionRate: 0,
          averageTicket: 0,
          retentionRate: 0,
          monthlyGrowth: 0,
        },
      },
    ]

    this.applyFilters()
    this.loading = false
  }

  updateMetrics() {
    const activeReferrals = this.referrals.filter((r) => r.status === "active")
    const pendingReferrals = this.referrals.filter((r) => r.status === "pending")

    this.metrics = {
      totalReferrals: this.referrals.length,
      activeReferrals: activeReferrals.length,
      pendingReferrals: pendingReferrals.length,
      totalCommissions: this.referrals.reduce((sum, r) => sum + r.totalCommissions, 0),
      monthlyCommissions: activeReferrals.reduce((sum, r) => sum + r.totalCommissions * 0.1, 0), // Simulated monthly
      conversionRate: this.referrals.length > 0 ? (activeReferrals.length / this.referrals.length) * 100 : 0,
      averageCommissionPerReferral:
        activeReferrals.length > 0
          ? activeReferrals.reduce((sum, r) => sum + r.totalCommissions, 0) / activeReferrals.length
          : 0,
      totalVolume: this.referrals.reduce((sum, r) => sum + r.totalVolume, 0),
      averageTicket:
        activeReferrals.length > 0
          ? activeReferrals.reduce((sum, r) => sum + r.performance.averageTicket, 0) / activeReferrals.length
          : 0,
      retentionRate:
        activeReferrals.length > 0
          ? activeReferrals.reduce((sum, r) => sum + r.performance.retentionRate, 0) / activeReferrals.length
          : 0,
    }
  }

  applyFilters() {
    this.filteredReferrals = this.referrals.filter((referral) => {
      const matchesSearch =
        !this.filters.search ||
        referral.referredName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        referral.referredEmail.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        referral.id.toLowerCase().includes(this.filters.search.toLowerCase())

      const matchesStatus = !this.filters.status || referral.status === this.filters.status
      const matchesKycStatus = !this.filters.kycStatus || referral.kycStatus === this.filters.kycStatus
      const matchesSource = !this.filters.source || referral.source === this.filters.source
      const matchesLevel = !this.filters.level || referral.level.toString() === this.filters.level

      const matchesMinCommissions =
        this.filters.minCommissions === null || referral.totalCommissions >= this.filters.minCommissions
      const matchesMaxCommissions =
        this.filters.maxCommissions === null || referral.totalCommissions <= this.filters.maxCommissions

      const matchesMinVolume = this.filters.minVolume === null || referral.totalVolume >= this.filters.minVolume
      const matchesMaxVolume = this.filters.maxVolume === null || referral.totalVolume <= this.filters.maxVolume

      const matchesMinRiskScore = this.filters.minRiskScore === null || referral.riskScore >= this.filters.minRiskScore
      const matchesMaxRiskScore = this.filters.maxRiskScore === null || referral.riskScore <= this.filters.maxRiskScore

      const matchesHasTransactions =
        this.filters.hasTransactions === null ||
        (this.filters.hasTransactions && referral.totalTransactions > 0) ||
        (!this.filters.hasTransactions && referral.totalTransactions === 0)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesKycStatus &&
        matchesSource &&
        matchesLevel &&
        matchesMinCommissions &&
        matchesMaxCommissions &&
        matchesMinVolume &&
        matchesMaxVolume &&
        matchesMinRiskScore &&
        matchesMaxRiskScore &&
        matchesHasTransactions
      )
    })

    this.totalPages = Math.ceil(this.filteredReferrals.length / this.itemsPerPage)
    this.currentPage = 1
    this.updatePagination()
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedReferrals = this.filteredReferrals.slice(startIndex, endIndex)
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
      kycStatus: "",
      source: "",
      level: "",
      minCommissions: null,
      maxCommissions: null,
      minVolume: null,
      maxVolume: null,
      minRiskScore: null,
      maxRiskScore: null,
      period: "all",
      dateFrom: "",
      dateTo: "",
      tags: [],
      hasTransactions: null,
    }
    this.applyFilters()
  }

  viewDetails(referral: Referral) {
    this.selectedReferral = referral
    this.detailsVisible = true
  }

  exportCSV() {
    // Implementation for CSV export
    console.log("Exporting referrals to CSV...")
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      active: "tag-success",
      pending: "tag-warning",
      inactive: "tag-secondary",
      rejected: "tag-danger",
      blocked: "tag-danger",
    }
    return classes[status] || "tag-secondary"
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      active: "Ativo",
      pending: "Pendente",
      inactive: "Inativo",
      rejected: "Rejeitado",
      blocked: "Bloqueado",
    }
    return labels[status] || status
  }

  getKycStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      approved: "tag-success",
      pending: "tag-warning",
      rejected: "tag-danger",
      expired: "tag-secondary",
    }
    return classes[status] || "tag-secondary"
  }

  getKycStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      approved: "Aprovado",
      pending: "Pendente",
      rejected: "Rejeitado",
      expired: "Expirado",
    }
    return labels[status] || status
  }

  getSourceLabel(source: string): string {
    const labels: { [key: string]: string } = {
      direct: "Direto",
      social: "Redes Sociais",
      email: "E-mail",
      whatsapp: "WhatsApp",
      website: "Website",
      event: "Evento",
    }
    return labels[source] || source
  }

  fmt(value: number, type: string, minDecimals = 2, maxDecimals = 2): string {
    if (type === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
      }).format(value)
    } else if (type === "percent") {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals,
      }).format(value / 100)
    } else if (type === "int") {
      return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    }
    return value.toString()
  }
}
