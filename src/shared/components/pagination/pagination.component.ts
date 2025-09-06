import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'orb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  maxVisible = 5; // padrão (desktop)
  pages: number[] = [];

  ngOnChanges(): void {
    this.updatePages();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateMaxVisible();
    this.updatePages();
  }

  ngOnInit(): void {
    this.updateMaxVisible();
    this.updatePages();
  }

  private updateMaxVisible(): void {
    if (window.innerWidth <= 950) {
      this.maxVisible = 2;
    } else {
      this.maxVisible = 5;
    }
  }

  private updatePages(): void {
    const half = Math.floor(this.maxVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxVisible - 1);

    start = Math.max(1, end - this.maxVisible + 1);
    this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  prev(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.changePage(page);
    }
  }

  private changePage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    this.updatePages();
  }
}
