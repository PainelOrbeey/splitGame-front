import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import type { PaymentLink, PaymentLinkFilters, CreatePaymentLinkRequest } from "../../interfaces/payment-link.interface";
import { FilterTabsComponent } from "../../../../../shared/components/filter-tabs/filter-tabs.component";
import { PaginationComponent } from "../../../../../shared/components/pagination/pagination.component";
import { SidebarFiltersComponent } from "../../../../../shared/components/sidebar-filters/sidebar-filters.component";
import { SummaryCardComponent } from "../../../../../shared/components/sumary-cards/sumary-cards.component";
import { UserMenuComponent } from "../../../../../shared/components/user-menu/user-menu.component";
import { CustomDialogComponent } from "../../../../../shared/components/custom-dialog/custom-dialog.component";

type Status = "ativo" | "inativo" | "pausado";

@Component({
  selector: "app-payment-links",
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    FormsModule,
    UserMenuComponent,
    FilterTabsComponent,
    SummaryCardComponent,
    SidebarFiltersComponent,
    CustomDialogComponent,
  ],
  templateUrl: "./payment-links.component.html",
  styleUrls: ["./payment-links.component.scss"],
})
export class PaymentLinksComponent implements OnInit {
  // ---- Estado principal
  paymentLinks: PaymentLink[] = [];
  filteredLinks: PaymentLink[] = [];

  // Filtros seguros (sem undefined em priceRange)
  filters: PaymentLinkFilters = {
    status: "",
    search: "",
    priceRange: { min: null as number | null, max: null as number | null },
  };

  // Paginação
  currentPage = 1;
  itemsPerPage = 10;

  // Modais
  showCreateModal = false;
  showDetailsModal = false;
  showCustomizeModal = false;
  selectedLink: PaymentLink | null = null;

  // Form "Criar Link"
  newLink: CreatePaymentLinkRequest = { name: "", description: "", price: 0 };

  // Loading states
  loading = false;
  creating = false;

  // Tema (útil pro preview de customização)
  theme = { primary: "#0048ff", radius: 12 };

  ngOnInit() {
    this.loadPaymentLinks();
  }

  // =============== Carga (seed fixo) ===============
  private seedFixedLinks(): PaymentLink[] {
    const now = new Date();
    const mk = (
      id: string,
      name: string,
      desc: string,
      price: number,
      status: Status,
      createdAtISO: string,
      views: number,
      clicks: number,
      conv: number,
      revenue: number
    ): PaymentLink => ({
      id,
      name,
      description: desc,
      price,
      status,
      url: this.ensureUniqueUrl(this.slugUrl(name)),
      createdAt: new Date(createdAtISO),
      updatedAt: new Date(createdAtISO),
      analytics: { views, clicks, conversions: conv, revenue },
    });

    return [
      mk("1", "Split Game Pro", "Assinatura mensal", 29.9, "ativo", "2024-01-15T10:00:00Z", 150, 45, 12, 358.8),
      mk("2", "Curso de Angular", "Do zero ao avançado", 497, "ativo", "2024-02-10T12:00:00Z", 420, 120, 37, 18389),
      mk("3", "Mentoria Premium", "3 encontros 1:1", 1497, "pausado", "2024-03-05T09:00:00Z", 88, 22, 4, 5988),
      mk("4", "E-book Finanças", "Guia definitivo", 59, "ativo", "2024-01-25T08:00:00Z", 320, 77, 19, 1121),
      mk("5", "Orbeey Starter", "Plano anual", 999, "inativo", "2024-04-01T15:00:00Z", 210, 50, 6, 5994),
      mk("6", "Workshop PIX", "Turma única", 199, "ativo", "2024-05-12T14:00:00Z", 180, 60, 18, 3582),
      mk("7", "Licença SaaS", "Por usuário", 39, "ativo", "2024-06-01T10:30:00Z", 90, 30, 9, 351),
      mk("8", "Consultoria Express", "Pacote 2h", 349, "ativo", "2024-06-18T17:45:00Z", 65, 20, 3, 1047),
    ].map((l) => ({ ...l, updatedAt: now })); // traz updatedAt pra "recentemente"
  }

  loadPaymentLinks() {
    this.loading = true;
    // Simula chamada de API
    setTimeout(() => {
      this.paymentLinks = this.seedFixedLinks();
      this.applyFilters(true);
      this.loading = false;
    }, 400);
  }

  // =============== Utils / Helpers ===============
  private slug(str: string) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  private slugUrl(name: string) {
    return `https://pay.example.com/${this.slug(name)}`;
  }

  private ensureUniqueUrl(baseUrl: string): string {
    // Garante que nenhuma URL se repita (acrescenta sufixo)
    if (!this.paymentLinks.some((l) => l.url === baseUrl)) return baseUrl;

    let i = 2;
    let candidate = `${baseUrl}-${i}`;
    while (this.paymentLinks.some((l) => l.url === candidate)) {
      i += 1;
      candidate = `${baseUrl}-${i}`;
    }
    return candidate;
  }

  // =============== Filtros & Paginação ===============
  applyFilters(resetPage = false) {
    const status = (this.filters.status || "").toLowerCase().trim();
    const term = (this.filters.search || "").toLowerCase().trim();
    const min = this.filters.priceRange?.min ?? null;
    const max = this.filters.priceRange?.max ?? null;

    this.filteredLinks = this.paymentLinks.filter((link) => {
      if (status && link.status !== status) return false;

      if (term) {
        const hay = `${link.name} ${link.description ?? ""}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }

      if (min != null && link.price < Number(min)) return false;
      if (max != null && link.price > Number(max)) return false;

      return true;
    });

    if (resetPage) this.currentPage = 1;
  }

  get paginatedLinks() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLinks.slice(start, end);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredLinks.length / this.itemsPerPage));
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  trackById = (_: number, item: PaymentLink) => item.id;

  // =============== Modais ===============
  openCreateModal() {
    this.newLink = { name: "", description: "", price: 0 };
    this.showCreateModal = true;
  }

  openDetailsModal(link: PaymentLink) {
    this.selectedLink = link;
    this.showDetailsModal = true;
  }

  openCustomizeModal(link?: PaymentLink | null) {
    // fallback: se não veio link e há algum item filtrado, usa o primeiro
    this.selectedLink = link ?? this.selectedLink ?? this.filteredLinks[0] ?? null;
    if (!this.selectedLink) return; // nada pra customizar
    this.showCustomizeModal = true;
  }

  // =============== Ações (criar/editar/copiar) ===============
  createPaymentLink() {
    if (!this.newLink.name || !this.newLink.price) return;

    this.creating = true;

    setTimeout(() => {
      const baseUrl = this.slugUrl(this.newLink.name);
      const url = this.ensureUniqueUrl(baseUrl);

      const newLink: PaymentLink = {
        id: Date.now().toString(),
        name: this.newLink.name,
        description: this.newLink.description,
        price: Number(this.newLink.price),
        status: "ativo",
        url,
        createdAt: new Date(),
        updatedAt: new Date(),
        analytics: { views: 0, clicks: 0, conversions: 0, revenue: 0 },
      };

      this.paymentLinks = [newLink, ...this.paymentLinks];
      this.applyFilters(true);
      this.creating = false;
      this.showCreateModal = false;
      this.selectedLink = newLink;
    }, 400);
  }

  toggleStatus(link: PaymentLink) {
    link.status = link.status === "ativo" ? "inativo" : "ativo";
    link.updatedAt = new Date();
  }

  deleteLink(link: PaymentLink) {
    if (!confirm("Tem certeza que deseja excluir este link de pagamento?")) return;
    this.paymentLinks = this.paymentLinks.filter((l) => l.id !== link.id);
    if (this.selectedLink?.id === link.id) this.selectedLink = null;
    this.applyFilters();
  }

  async copyLink(link: PaymentLink) {
    try {
      await navigator.clipboard.writeText(link.url);
      // opcional: toast
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = link.url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  // "Gerar novo link" – mantém nome/preço/analytics, só troca URL e updatedAt
  generateNewLink(link: PaymentLink) {
    const base = this.slugUrl(link.name);
    const unique = this.ensureUniqueUrl(`${base}-${Date.now()}`);
    link.url = unique;
    link.updatedAt = new Date();
  }

  // =============== Formatters ===============
  formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value ?? 0);
    }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }
}
