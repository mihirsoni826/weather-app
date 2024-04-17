import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  darkModeToggle(event: any) {
    if (event.target.checked)
      document.getElementsByTagName('html')[0].classList.add('dark');
    else document.getElementsByTagName('html')[0].classList.remove('dark');
  }
}
