import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from "../../../../shared/components/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, AdminSidebarComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
