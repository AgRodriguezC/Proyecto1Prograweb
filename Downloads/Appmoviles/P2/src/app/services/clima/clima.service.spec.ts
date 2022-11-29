import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClimaComponent } from './clima.service';

describe('ClimaComponent', () => {
  let componentCli: ClimaComponent;
  let fixture: ComponentFixture<ClimaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClimaComponent);
    componentCli = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(componentCli).toBeTruthy();
  });
});


describe('ClimaService', () => {
  let service: ClimaComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimaComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
