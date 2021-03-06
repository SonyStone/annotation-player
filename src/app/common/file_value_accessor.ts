import { Directive, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: `input[type=file][formControlName],
             input[type=file][formControl],
             input[type=file][ngModel]`,
  host: {
    '(input)': 'onChange($event.target.files)',
    '(blur)': 'onTouched()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileValueAccessor),
      multi: true
    }
  ]
})
export class FileValueAccessor implements ControlValueAccessor {

  @Input() multiple!: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  writeValue(value: number): void {}

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = (value: FileList) => {
      fn(value);
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  protected setProperty(key: string, value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, key, value);
  }
}
