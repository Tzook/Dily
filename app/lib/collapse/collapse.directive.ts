import {Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

const DEFAULT_COLLAPSE_TIME = 400;

@Directive({
  selector: '[collapsed]',
})
export class CollapseDirective implements OnChanges {
    @Input() collapsed: boolean;
    @Input() collapseTime: number;
    @Output() animationStable = new EventEmitter();
    
    private _el;
    
    constructor(private _animationBuilder: AnimationBuilder,
                el: ElementRef) {
        this._el = el.nativeElement;
        // always mendatory, since layout sometimes changes when overflow changes
        this._el.style.overflow = 'hidden'; 
    }
    
    private _hideElement(): void {
        this._el.style.height = '0px';
        this.animationStable.emit({collapsed: true});
    }
    
    private _showElement(): void {
        this._el.style.height = 'auto';
        this.animationStable.emit({collapsed: false});
    }
    
    private _animate(from: string, to: string): void {
        this._animationBuilder.css()
            .setDuration(this.collapseTime || DEFAULT_COLLAPSE_TIME)
            .setFromStyles({ height: from })
            .setToStyles({ height: to })
            .start(this._el)
            .onComplete(to === '0px' ? this._hideElement.bind(this) : this._showElement.bind(this));
    }
    
    private _toggleElement(toCollapse: boolean): void {
        var fullHeight = this._el.scrollHeight + 'px';
        if (toCollapse) {
            this._animate(fullHeight, '0px');
        } else {
            this._animate('0px', fullHeight);
        }
    }
    
    ngOnChanges(changes: any) {
        let collapsed: SimpleChange = changes.collapsed;
        if (collapsed.isFirstChange()) {
            // we want to simply hide/show the element based on the initial value
            collapsed.currentValue ? this._hideElement() : this._showElement();
        } else if (collapsed.currentValue !== collapsed.previousValue) {
            this._toggleElement(collapsed.currentValue);
        }
    }
}