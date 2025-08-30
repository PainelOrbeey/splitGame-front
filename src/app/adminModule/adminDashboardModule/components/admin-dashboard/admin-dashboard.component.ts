import { Component, type OnInit, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Chart, type ChartType, registerables } from "chart.js"
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

interface SalesFunnelItem {
  label: string
  value: string
  color: string
  icon: string
}

interface CategoryItem {
  name: string
  percentage: number
  products: string
}

interface Invoice {
  no: string
  idCustomer: string
  customerName: string
  customerAddress: string
  date: string
  type: string
  status: "completed" | "pending" | "failed"
  amount: string
}

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, UserMenuComponent],
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("salesChart", { static: false }) salesChartRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("funnelChart", { static: false }) funnelChartRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("categoryChart", { static: false }) categoryChartRef!: ElementRef<HTMLCanvasElement>

  metricCards: MetricCard[] = [
    {
      title: "Total Sales",
      value: "$360.00",
      change: "+12%",
      changeType: "positive",
      period: "vs previous, 28 days",
      chartType: "bar",
      chartData: [20, 35, 25, 40, 30, 45, 100, 35, 25, 30, 20, 15, 25, 30],
    },
    {
      title: "Pix",
      value: "$4,562",
      change: "+12%",
      changeType: "positive",
      period: "vs previous, 28 days",
      chartType: "line",
      chartData: [30, 35, 40, 45, 50, 55, 60, 65],
    },
    {
      title: "Total de venda",
      value: "$2,562",
      change: "+4%",
      changeType: "positive",
      period: "vs previous, 28 days",
      chartType: "line",
      chartData: [25, 30, 35, 40, 45, 50, 55, 60],
    },
    {
      title: "Cartão de Crédito",
      value: "$2,262",
      change: "-0.89%",
      changeType: "negative",
      period: "vs previous, 28 days",
      chartType: "line",
      chartData: [50, 45, 40, 35, 30, 25, 20, 15],
    },
    {
      title: "Boleto",
      value: "$2,100",
      change: "+2%",
      changeType: "positive",
      period: "vs previous, 28 days",
      chartType: "line",
      chartData: [20, 25, 30, 35, 40, 45, 50, 55],
    },
  ]

  salesFunnelItems: SalesFunnelItem[] = [
    { label: "Total Market", value: "$4,562", color: "#0048ff", icon: "pi pi-chart-bar" },
    { label: "Prospects", value: "$2,562", color: "#ff9500", icon: "pi pi-users" },
    { label: "Leads", value: "$1,262", color: "#ff3b30", icon: "pi pi-target" },
    { label: "Sales", value: "$1,000", color: "#00c896", icon: "pi pi-check-circle" },
  ]

  categoryItems: CategoryItem[] = [
    { name: "Clothing", percentage: 25, products: "1,348 Category Products" },
    { name: "Body Fit", percentage: 35, products: "1,348 Category Products" },
    { name: "Sportswear", percentage: 40, products: "1,348 Category Products" },
  ]

  recentInvoices: Invoice[] = [
    {
      no: "01",
      idCustomer: "#06499",
      customerName: "Aurelien Salomon",
      customerAddress: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: "Electric",
      status: "completed",
      amount: "$100",
    },
  ]

  private salesChart?: Chart
  private funnelChart?: Chart
  private categoryChart?: Chart

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createSalesChart()
      this.createFunnelChart()
      this.createCategoryChart()
    }, 100)
  }

  private createSalesChart(): void {
    if (!this.salesChartRef?.nativeElement) return

    const ctx = this.salesChartRef.nativeElement.getContext("2d")
    if (!ctx) return

    this.salesChart = new Chart(ctx, {
      type: "bar" as ChartType,
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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

  private createCategoryChart(): void {
    if (!this.categoryChartRef?.nativeElement) return

    const ctx = this.categoryChartRef.nativeElement.getContext("2d")
    if (!ctx) return

    this.categoryChart = new Chart(ctx, {
      type: "doughnut" as ChartType,
      data: {
        datasets: [
          {
            data: [40, 35, 25],
            backgroundColor: ["#0048ff", "#002576", "#e5e7eb"],
            borderWidth: 0,
            borderRadius: 5,
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
        layout: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        }
      } as any, // Use 'as any' para permitir propriedades específicas do doughnut
    })

    // Adicionar propriedades específicas após a criação
    if (this.categoryChart.options) {
      (this.categoryChart.options as any).cutout = '75%',
      (this.categoryChart.options as any).radius = '90%'
      this.categoryChart.update()
    }
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
      case "completed":
        return "status-completed"
      case "pending":
        return "status-pending"
      case "failed":
        return "status-failed"
      default:
        return ""
    }
  }

  ngOnDestroy(): void {
    if (this.salesChart) this.salesChart.destroy()
    if (this.funnelChart) this.funnelChart.destroy()
    if (this.categoryChart) this.categoryChart.destroy()
  }
}
