import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'action-bet',
    template: `
        <div class="bet-values">
            <input #count (keyup)="0" (mouseup)="0" type="number" min="1" max="99">
            <input #die (keyup)="0" (mouseup)="0" type="number" min="1" max="6">
        </div>
        <button [disabled]="!count.value || !die.value" (click)="emitBet(count.value, die.value); count.value = die.value = ''">bet</button>
        <button (click)="emitLying()">lying!</button>
    `,
    directives: [],
})
export class ActionBetComponent {
    @Output() bet = new EventEmitter();
    @Output() lying = new EventEmitter();

    emitBet(count, die) {
        this.bet.emit({count, die});
    }
    
    emitLying() {
        this.lying.emit({});
    }
}