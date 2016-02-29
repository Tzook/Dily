import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgSwitch, NgSwitchWhen} from 'angular2/common';
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
                <button (click)="emitAction('roll')">roll</button>
            </template>
            <template ngSwitchWhen="bet">
                <action-bet (lying)="emitAction('lying')" (bet)="emitAction('bet', $event)"></action-bet>
            </template>
            <template ngSwitchWhen="next">
                <button (click)="emitAction('next')">continue</button>
            </template>
        </div>
    `,
    directives: [NgSwitch, NgSwitchWhen, ActionStartComponent, ActionBetComponent],
})
export class ActionsComponent {
    @Input() state:string;
    @Output() action = new EventEmitter();

    emitAction(action, params = undefined) {
        this.action.emit({action, params})
    }
}