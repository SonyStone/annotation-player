import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-pause',
  templateUrl: 'pause.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPauseComponent {}

@NgModule({
  exports: [IconPauseComponent],
  declarations: [IconPauseComponent],
})
export class IconPauseModule { }
