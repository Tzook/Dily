import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ActionStartComponent} from './action-start.component';
import {ActionBetComponent} from './action-bet.component';

@Component({
    selector: 'actions',
    template: `
        <div [ngSwitch]="state">
            <template ngSwitchWhen="start">
                <action-start (start)="emitAction('start')"></action-start>
            </template>
            <template ngSwitchWhen="roll">
                <button #rollButton (click)="emitAction('roll'); rollButton.disabled = true;">roll</button>
            </template>
            <template ngSwitchWhen="bet">
                <action-bet (lying)="emitAction('lying')" (bet)="emitAction('bet', $event)"></action-bet>
            </template>
            <template ngSwitchWhen="next">
                <button (click)="emitAction('next')">continue</button>
            </template>
        </div>
    `,
    directives: [ActionStartComponent, ActionBetComponent],
})
export class ActionsComponent {
    @Input() state:string;
    @Output() action = new EventEmitter();

    emitAction(action:string, params = undefined) {
        this.action.emit({action, params})
    }
}