import { ContentChildren, Directive, HostListener, QueryList } from "@angular/core";
import { KeyboardManagedItemDirective } from "./keyboard-managed-item.directive";

@Directive({
    selector: '[keyboard-manager]'
})
export class KeyboardManagerDirective {
    
    @ContentChildren(KeyboardManagedItemDirective) public items: QueryList<KeyboardManagedItemDirective> = null;

    @HostListener('keyup', ['$event'])
    public manageKeys(event: KeyboardEvent): void {
        switch(event.key) {
            case 'ArrowUp':
            case 'ArrowRight': {
                this.moveFocous(ArrowDirection.RIGHT).focus()
                break;
            }
            case 'ArrowDown':
            case 'ArrowLeft': {
                this.moveFocous(ArrowDirection.LEFT).focus()
                break;
            }
        }
    }

    public moveFocous(direction: ArrowDirection): KeyboardManagedItemDirective {
        const items = this.items.toArray();
        const currentFocusedIndex = items.findIndex(item => item.isFocused());
        const nextFocus = items[currentFocusedIndex + direction];

        if (nextFocus) {
            return nextFocus
        }

        return direction === ArrowDirection.LEFT
        ? items[items.length - 1]
        : items[0]
    }
}

enum ArrowDirection {
    LEFT = -1,
    RIGHT = 1
}