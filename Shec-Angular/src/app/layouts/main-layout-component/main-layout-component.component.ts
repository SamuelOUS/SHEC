import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-main-layout-component',
  standalone: true,
  imports: [RouterModule, SideMenuComponent],
  templateUrl: './main-layout-component.component.html',
  styleUrl: './main-layout-component.component.css'
})
export class MainLayoutComponentComponent {

}
