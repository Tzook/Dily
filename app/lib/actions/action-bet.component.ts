import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'action-bet',
    template: `
        <div class="bet-values">
            <input #count (keyup)="0" (mouseup)="0" type="number" min="1" max="99">
            <input #die (keyup)="0" (mouseup)="0" type="number" min="1" max="6">
        </div>
        <button [disabled]="disableBet || !count.value || !die.value" (click)="_emitBet(count.value, die.value); count.value = die.value = ''">bet</button>
        <button [disabled]="disableLying" (click)="_emitLying()">lying!</button>
    `,
    directives: [],
})
export class ActionBetComponent {
    @Input() disableBet: boolean;
    @Input() disableLying: boolean;
    @Output() bet = new EventEmitter();
    @Output() lying = new EventEmitter();

    private _emitBet(count: string, die: string): void {
        this.bet.emit({count, die});
    }
    
    private _emitLying(): void {
        this.lying.emit({});
    }
}