import {Directive, ElementRef, Input, OnChanges, SimpleChange} from 'angular2/core';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

const DEFAULT_COLLAPSE_TIME = 400;

@Directive({
  selector: '[collapse]',
})
export class CollapseDirective implements OnChanges {
    @Input() collapse:boolean;
    @Input() collapseTime:number;
    
    private _el;
    
    constructor(private _animationBuilder: AnimationBuilder,
                el: ElementRef) {
        this._el = el.nativeElement;
        // always mendatory, since layout sometimes changes when overflow changes
        this._el.style.overflow = 'hidden'; 
    }
    
    hideElement() {
        this._el.style.height = '0px';
    }
    showElement() {
        this._el.style.height = 'auto';
    }
    
    animate(from:string, to:string) {
        this._animationBuilder.css()
            .setDuration(this.collapseTime || DEFAULT_COLLAPSE_TIME)
            .setFromStyles({ height: from })
            .setToStyles({ height: to })
            .start(this._el)
            .onComplete(to === '0px' ? this.hideElement.bind(this) : this.showElement.bind(this));
    }
    
    toggleElement(collapse:boolean) {
        var fullHeight = this._el.scrollHeight + 'px';
        if (collapse) {
            this.animate(fullHeight, '0px');
        } else {
            this.animate('0px', fullHeight);
        }
    }
    
    ngOnChanges(changes:any) {
        let collapse:SimpleChange = changes.collapse;
        console.log(collapse);
        if (collapse.isFirstChange()) {
            // we want to simply hide/show the element based on the initial value
            collapse.currentValue ? this.hideElement() : this.showElement();
        } else if (collapse.currentValue !== collapse.previousValue) {
            this.toggleElement(collapse.currentValue);
        }
    }
}