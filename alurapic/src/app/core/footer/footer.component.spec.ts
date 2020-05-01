import { TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";

describe('O componente Footer', () => {

    let component: FooterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ FooterComponent ], // COMPONENTS
            // providers: [] SERVICES,
            // imports: [] MODULES
        });

        const fixture = TestBed.createComponent(FooterComponent); // Para criar o componente
        component = fixture.componentInstance; // Extrair o componente
        fixture.detectChanges(); // Para executar os métodos de ciclo de vida do componente
    });

    // teste de fumaça: instanciar a classe
    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });
});