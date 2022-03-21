

import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
    selector: '[keyboard-item]'
})
export class KeyboardManagedItemDirective {
    
    @Output() public focused = new EventEmitter<void>();
    
    constructor(private elementRef: ElementRef<HTMLElement>) { }
    
    public focus(): void {
        this.focused.emit();
        this.elementRef.nativeElement.focus();
    }

    public isFocused(): boolean {
        return this.elementRef.nativeElement === document.activeElement;
    }
}