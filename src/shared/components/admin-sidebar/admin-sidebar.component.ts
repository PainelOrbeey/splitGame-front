import { Component, HostBinding, OnInit, OnDestroy } from "@angular/core"
import { Router, RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AvatarModule } from "primeng/avatar"
import { RippleModule } from "primeng/ripple"
import { BadgeModule } from "primeng/badge"

interface NavItem {
  label: string
  icon?: string
  route?: string
  badge?: string
  children?: NavItem[]
  expanded?: boolean
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.scss"],
  imports: [CommonModule, RouterModule, AvatarModule, RippleModule, BadgeModule],
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  collapsed = false

  @HostBinding("class.overlay") overlay = false
  @HostBinding("class.collapsed") get isCollapsed() {
    return this.collapsed
  }

  menu: NavItem[] = []
  footer: NavItem[] = []

  private adminMenu: NavItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      route: "/admin/dashboard",
    },
    {
      label: "Solicitações KYC",
      icon: "pi pi-user-plus",
      route: "/admin/kyc-requests",
    },
    {
      label: "Todas as Empresas",
      icon: "pi pi-building",
      route: "/admin/all-companies",
    },
    {
      label: "Todas as Transações",
      icon: "pi pi-credit-card",
      route: "/admin/all-transactions",
    },
    {
      label: "Todos os Saques",
      icon: "pi pi-money-bill",
      route: "/admin/all-withdrawals",
    },
    {
      label: "Todas as Antecipações",
      icon: "pi pi-forward",
      route: "/admin/all-advances",
    },
    {
      label: "Integrações",
      icon: "pi pi-microchip",
      route: "/admin/integrations",
    },
    {
      label: "Relatórios Financeiros",
      icon: "pi pi-chart-line",
      expanded: false,
      children: [
        { label: "Faturamento por Período", route: "/admin/company-period" },
        { label: "Faturamento por Empresa", route: "/admin/company-revenue" },
        { label: "Lucro por Empresa", route: "/admin/profit-company" },
        { label: "Faturamento por Adquirente", route: "/admin/acquirer-revenue" },
      ],
    },
  ]

  private userMenu: NavItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      route: "/company/dashboard",
    },
    {
      label: "Minhas Transações",
      icon: "pi pi-credit-card",
      route: "/company/transactions",
    },
    {
      label: "Meus Clientes",
      icon: "pi pi-users",
      route: "/company/clients",
    },
    {
      label: "Meus Referidos",
      icon: "pi pi-users",
      route: "/company/referrals",
    },
    {
      label: "Meus Recebíveis",
      icon: "pi pi-money-bill",
      route: "/company/receivables",
    },


  ]

  private adminFooter: NavItem[] = [
    { label: "Configurações", icon: "pi pi-cog", route: "/admin/settings" },
  ]

  private userFooter: NavItem[] = [
    { label: "Minha Empresa", icon: "pi pi-building", route: "/company/my-company" },
  ]

  constructor(private router: Router) {}

  ngOnInit() {
    this.onResize()
    window.addEventListener("resize", this.onResize)
    this.setMenuByRoute()
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize)
  }

  private setMenuByRoute(): void {
    const currentUrl = this.router.url
    if (currentUrl.startsWith("/admin")) {
      this.menu = this.adminMenu
      this.footer = this.adminFooter
    } else if (currentUrl.startsWith("/company")) {
      this.menu = this.userMenu
      this.footer = this.userFooter
    }
  }

  handleLinkClick(item: NavItem) {
    if (this.collapsed) {
      this.collapsed = false
    }
  }

  handleGroupClick(item: NavItem) {
    if (this.collapsed) {
      this.collapsed = false
      item.expanded = true
    } else {
      item.expanded = !item.expanded
    }
  }

  toggle() {
    this.collapsed = !this.collapsed
  }

  onResize = () => {
    this.overlay = window.innerWidth < 768
  }
}
