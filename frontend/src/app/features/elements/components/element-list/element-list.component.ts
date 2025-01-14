import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementListComponent { }
