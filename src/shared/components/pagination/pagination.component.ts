import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
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

  pages: number[] = [];

  ngOnChanges(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
  }
}
