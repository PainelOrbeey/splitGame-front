import { Component, HostBinding } from "@angular/core"
import { RouterModule } from "@angular/router"
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
  selector: "app-admin-sidebar",
  standalone: true,
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.scss"],
  imports: [CommonModule, RouterModule, AvatarModule, RippleModule, BadgeModule],
})
export class AdminSidebarComponent {
  collapsed = false

  @HostBinding("class.overlay") overlay = false
  @HostBinding("class.collapsed") get isCollapsed() {
    return this.collapsed
  }

  menu: NavItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      route: "/home/dashboard",
    },
    {
      label: "Solicitações KYC",
      icon: "pi pi-user-plus",
      route: "/home/kyc-requests",
    },
    {
      label: "Todas as Empresas",
      icon: "pi pi-building",
      route: "/home/all-companies",
    },
    {
      label: "Todas as Transações",
      icon: "pi pi-credit-card",
      route: "/home/all-transactions",
    },
    {
      label: "Todos os Saques",
      icon: "pi pi-money-bill",
      route: "/admin/withdrawals",
    },
    {
      label: "Todas as Antecipações",
      icon: "pi pi-forward",
      route: "/admin/advances",
    },
    {
      label: "Relatórios Financeiros",
      icon: "pi pi-chart-line",
      expanded: false,
      children: [
        { label: "Faturamento por Período", route: "/admin/billing-period" },
        { label: "Faturamento por Empresa", route: "/admin/billing-company" },
        { label: "Lucro por Empresa", route: "/admin/profit-company" },
        { label: "Faturamento por Adquirente", route: "/admin/billing-acquirer" },
      ],
    },
  ]

  footer: NavItem[] = [
    { label: "Configurações", icon: "pi pi-cog", route: "/admin/settings" },
  ]

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

  ngOnInit() {
    this.onResize()
    window.addEventListener("resize", this.onResize)
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize)
  }
}
