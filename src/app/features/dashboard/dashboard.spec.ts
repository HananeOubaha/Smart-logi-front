import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard'; // 1. Smiya s7i7a
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], // 2. Importina l'component s7i7
      providers: [
        // 3. Darouri n-fourniw hado hit l'component fih Constructor kbir
        provideHttpClient(),        // Bach y-qder y-dir requetes Http
        provideHttpClientTesting(), // Mock dyal Http lil-test
        provideRouter([])           // Bach y-khdem Router
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // 4. Lance ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
