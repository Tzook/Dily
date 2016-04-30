import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ActionStartComponent} from './action-start.component';
import {ActionBetComponent} from './action-bet.component';

@Component({
    selector: 'actions',
    template: `
        <div [ngSwitch]="state">
            <template ngSwitchWhen="start">
                <action-start (start)="_emitAction('start')"></action-start>
            </template>
            <template ngSwitchWhen="roll">
                <button #rollButton (click)="rollButton.disabled = true; _emitAction('roll');">roll</button>
            </template>
            <template ngSwitchWhen="bet">
                <action-bet [disableBet]="!myTurn" [disableLying]="!myTurn || !hasBet" (lying)="_emitAction('lying')" (bet)="_emitAction('bet', $event)"></action-bet>
            </template>
            <template ngSwitchWhen="next">
                <button (click)="_emitAction('next')">continue</button>
            </template>
        </div>
    `,
    directives: [ActionStartComponent, ActionBetComponent],
})
export class ActionsComponent {
    @Input() state: string;
    @Input() hasBet: boolean;
    @Input() myTurn: boolean;
    @Output() action = new EventEmitter();

    private _emitAction(action: string, params: any = undefined): void {
        this.action.emit({action, params})
    }
}