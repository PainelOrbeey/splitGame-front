import { Component, type OnInit, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Chart, type ChartType, registerables } from "chart.js"
import { FormsModule } from "@angular/forms"
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component"
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component"
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component"
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component"
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component"

Chart.register(...registerables)

interface MetricCard {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  period: string
  chartType: "bar" | "line"
  chartData: number[]
}

interface PartnerBalance {
  balance: string
  change: string
  changeType: "positive" | "negative"
  period: string
}

interface BrandOverviewItem {
  label: string
  percentage: number
  color: string
}

interface PartnerFunnelItem {
  label: string
  value: string
  color: string
  icon: string
}

interface BrandCategoryItem {
  name: string
  percentage: number
  partners: string
}

interface RecentPartner {
  id: string
  partnerName: string
  brandName: string
  joinDate: string
  status: "active" | "pending" | "inactive"
  revenue: string
  customizations: number
}

@Component({
  selector: "app-white-label-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule, UserMenuComponent, FilterTabsComponent, SummaryCardComponent, SidebarFiltersComponent, CustomDialogComponent],
  templateUrl: "./white-label-dashboard.component.html",
  styleUrls: ["./white-label-dashboard.component.scss"],
})
export class WhiteLabelDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("partnersChart", { static: false }) partnersChartRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("funnelChart", { static: false }) funnelChartRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("brandChart", { static: false }) brandChartRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("overviewChart", { static: false }) overviewChartRef!: ElementRef<HTMLCanvasElement>

  partnerBalance: PartnerBalance = {
    balance: "R$ 1.245.890,50",
    change: "+15,2%",
    changeType: "positive",
    period: "que no mês passado",
  }

  brandOverviewItems: BrandOverviewItem[] = [
    { label: "Píx", percentage: 35, color: "#0048ff" },
    { label: "Cartão", percentage: 28, color: "#00c896" },
    { label: "Boleto", percentage: 22, color: "#ff9500" },
    { label: "Charge Back", percentage: 15, color: "#e5e7eb" },
  ]

  metricCards: MetricCard[] = [
    {
      title: "Totais de Pedidos pagos",
      value: "1.248",
      change: "+18%",
      changeType: "positive",
      period: "vs anterior, 30 dias",
      chartType: "bar",
      chartData: [45, 52, 38, 65, 49, 75, 120, 68, 55, 62, 48, 35, 58, 72],
    },
    {
      title: "Faturamento",
      value: "R$ 89.450",
      change: "+24%",
      changeType: "positive",
      period: "vs anterior, 30 dias",
      chartType: "line",
      chartData: [65, 72, 68, 75, 82, 88, 95, 102],
    },
    {
      title: "Ticket Médio",
      value: "R$ 342",
      change: "+12%",
      changeType: "positive",
      period: "vs anterior, 30 dias",
      chartType: "line",
      chartData: [28, 35, 42, 48, 55, 62, 68, 75],
    },
    {
      title: "Pix",
      value: "1.856",
      change: "+8%",
      changeType: "positive",
      period: "vs anterior, 30 dias",
      chartType: "line",
      chartData: [85, 92, 88, 95, 102, 98, 105, 112],
    },
    {
      title: "Taxa de Conversão",
      value: "68,5%",
      change: "-2,1%",
      changeType: "negative",
      period: "vs anterior, 30 dias",
      chartType: "line",
      chartData: [75, 72, 68, 65, 62, 58, 55, 52],
    },
  ]

  partnerFunnelItems: PartnerFunnelItem[] = [
    { label: "Leads Qualificados", value: "2.845", color: "#0048ff", icon: "pi pi-users" },
    { label: "Propostas Enviadas", value: "1.652", color: "#ff9500", icon: "pi pi-send" },
    { label: "Em Negociação", value: "892", color: "#ff3b30", icon: "pi pi-comments" },
    { label: "Parceiros Ativos", value: "342", color: "#00c896", icon: "pi pi-check-circle" },
  ]

  brandCategoryItems: BrandCategoryItem[] = [
    { name: "Píx", percentage: 35, partners: "120 Parceiros Ativos" },
    { name: "Cartão", percentage: 28, partners: "96 Parceiros Ativos" },
    { name: "Boleto", percentage: 22, partners: "75 Parceiros Ativos" },
    { name: "Charge Back", percentage: 15, partners: "51 Parceiros Ativos" },
  ]

  recentPartners: RecentPartner[] = [
    {
      id: "WL001",
      partnerName: "TechSolutions Brasil",
      brandName: "TechSol",
      joinDate: "15 Nov 2024",
      status: "active",
      revenue: "R$ 45.890",
      customizations: 12,
    },
    {
      id: "WL002",
      partnerName: "EduPlatform Ltda",
      brandName: "EduPro",
      joinDate: "12 Nov 2024",
      status: "pending",
      revenue: "R$ 28.450",
      customizations: 8,
    },
    {
      id: "WL003",
      partnerName: "CommerceHub",
      brandName: "ShopHub",
      joinDate: "10 Nov 2024",
      status: "active",
      revenue: "R$ 67.230",
      customizations: 15,
    },
  ]

  private partnersChart?: Chart
  private funnelChart?: Chart
  private brandChart?: Chart
  private overviewChart?: Chart

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createPartnersChart()
      this.createFunnelChart()
      this.createBrandChart()
      this.createOverviewChart()
    }, 100)
  }

  private createPartnersChart(): void {
    if (!this.partnersChartRef?.nativeElement) return

    const ctx = this.partnersChartRef.nativeElement.getContext("2d")
    if (!ctx) return

    this.partnersChart = new Chart(ctx, {
      type: "bar" as ChartType,
      data: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
          {
            data: this.metricCards[0].chartData,
            backgroundColor: (ctx: any) => {
              const index = ctx.dataIndex
              return index === 6 ? "#0048ff" : "#e5e7eb"
            },
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              color: "#9ca3af",
              font: { size: 10 },
            },
          },
          y: {
            display: false,
            grid: { display: false },
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
      },
    })
  }

  private createFunnelChart(): void {
    if (!this.funnelChartRef?.nativeElement) return

    const ctx = this.funnelChartRef.nativeElement.getContext("2d")
    if (!ctx) return

    this.funnelChart = new Chart(ctx, {
      type: "line" as ChartType,
      data: {
        labels: Array.from({ length: 20 }, (_, i) => i),
        datasets: [
          {
            data: [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
            borderColor: "#0048ff",
            backgroundColor: "rgba(0, 72, 255, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        elements: {
          point: { radius: 0 },
        },
      },
    })
  }

    private createBrandChart(): void {
      if (!this.brandChartRef?.nativeElement) return

      const ctx = this.brandChartRef.nativeElement.getContext("2d")
      if (!ctx) return

      this.brandChart = new Chart(ctx, {
        type: "doughnut" as ChartType,
        data: {
          datasets: [
            {
              data: this.brandCategoryItems.map((item) => item.percentage).sort((a, b) => b - a),
              backgroundColor: ["#0048ff", "#002576", "#ff9500", "#e5e7eb"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // @ts-ignore
          cutout: "70%",
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
        },
      })
    }

    private createOverviewChart(): void {
      if (!this.overviewChartRef?.nativeElement) return

      const ctx = this.overviewChartRef.nativeElement.getContext("2d")
      if (!ctx) return

      this.overviewChart = new Chart(ctx, {
        type: "doughnut" as ChartType,
        data: {
          datasets: [
            {
              data: this.brandOverviewItems.map((item) => item.percentage),
              backgroundColor: this.brandOverviewItems.map((item) => item.color),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // @ts-ignore
          cutout: "65%",
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
        },
      })
    }

    createMiniChart(canvas: HTMLCanvasElement, data: number[], type: "line" | "bar", color: string): void {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    new Chart(ctx, {
      type: type as ChartType,
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data: data,
            borderColor: color,
            backgroundColor: type === "line" ? "transparent" : color,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    })
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "active":
        return "status-active"
      case "pending":
        return "status-pending"
      case "inactive":
        return "status-inactive"
      default:
        return ""
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "inactive":
        return "Inativo"
      default:
        return status
    }
  }

  ngOnDestroy(): void {
    if (this.partnersChart) this.partnersChart.destroy()
    if (this.funnelChart) this.funnelChart.destroy()
    if (this.brandChart) this.brandChart.destroy()
    if (this.overviewChart) this.overviewChart.destroy()
  }
}
