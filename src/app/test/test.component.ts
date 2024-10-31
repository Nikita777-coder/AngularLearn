import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  @Input() public parentData = "";
  @Output() public childEvent = new EventEmitter();

  public tap() {
    this.childEvent.emit("hello from child");
  }
}
