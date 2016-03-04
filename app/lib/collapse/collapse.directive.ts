import {Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

const DEFAULT_COLLAPSE_TIME = 400;

@Directive({
  selector: '[collapsed]',
})
export class CollapseDirective implements OnChanges {
    @Input() collapsed:boolean;
    @Input() collapseTime:number;
    @Output() animationStable = new EventEmitter();
    
    private _el;
    
    constructor(private _animationBuilder: AnimationBuilder,
                el: ElementRef) {
        this._el = el.nativeElement;
        // always mendatory, since layout sometimes changes when overflow changes
        this._el.style.overflow = 'hidden'; 
    }
    
    hideElement() {
        this._el.style.height = '0px';
        this.animationStable.emit({collapsed: true});
    }
    showElement() {
        this._el.style.height = 'auto';
        this.animationStable.emit({collapsed: false});
    }
    
    animate(from:string, to:string) {
        this._animationBuilder.css()
            .setDuration(this.collapseTime || DEFAULT_COLLAPSE_TIME)
            .setFromStyles({ height: from })
            .setToStyles({ height: to })
            .start(this._el)
            .onComplete(to === '0px' ? this.hideElement.bind(this) : this.showElement.bind(this));
    }
    
    toggleElement(toCollapse:boolean) {
        var fullHeight = this._el.scrollHeight + 'px';
        if (toCollapse) {
            this.animate(fullHeight, '0px');
        } else {
            this.animate('0px', fullHeight);
        }
    }
    
    ngOnChanges(changes:any) {
        let collapsed:SimpleChange = changes.collapsed;
        if (collapsed.isFirstChange()) {
            // we want to simply hide/show the element based on the initial value
            collapsed.currentValue ? this.hideElement() : this.showElement();
        } else if (collapsed.currentValue !== collapsed.previousValue) {
            this.toggleElement(collapsed.currentValue);
        }
    }
}