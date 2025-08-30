import { CommonModule } from "@angular/common"
import { Component, EventEmitter, Input, Output } from "@angular/core"

export interface DialogAction {
  label: string
  type: "primary" | "text"
  id: string
}

@Component({
  selector: "app-custom-dialog",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./custom-dialog.component.html",
  styleUrls: ["./custom-dialog.component.scss"],
})
export class CustomDialogComponent {
  @Input() title = "Detalhes"
  @Input() visible = false
  @Input() width = "800px"
  @Input() maxHeight = "90vh"
  @Output() visibleChange = new EventEmitter<boolean>()

  @Input() actions: DialogAction[] = []

  @Output() action = new EventEmitter<string>()
  @Output() close = new EventEmitter<void>()

  onClose() {
    this.updateVisible(false)
    this.close.emit()
  }

  onAction(id: string) {
    this.action.emit(id)
    if (id === "close" || id === "cancel") {
      this.updateVisible(false)
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation()
  }

  private updateVisible(v: boolean) {
    this.visible = v
    this.visibleChange.emit(v)
  }
}
