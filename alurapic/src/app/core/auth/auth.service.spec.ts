import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

describe('O serviço AuthService', () => {

    let service: AuthService;

    beforeEach(() => {
        // usado também quando um parametro precisa de outro paramentro, ai fica mtos objetos em cadeia
        TestBed.configureTestingModule({
            // declarations é componentes
            imports: [ // modulos
                HttpClientModule
            ],
            providers: [ // servicos
                AuthService
            ]
        });
        service = TestBed.get(AuthService);
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });
});