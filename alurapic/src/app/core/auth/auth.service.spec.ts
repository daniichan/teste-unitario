import { AuthService } from "./auth.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('O serviço AuthService', () => {

    let service: AuthService, httpMock: HttpTestingController;

    beforeEach(() => {
        // usado também quando um parametro precisa de outro paramentro, ai fica mtos objetos em cadeia
        TestBed.configureTestingModule({
            // declarations é componentes
            imports: [ // modulos
                HttpClientTestingModule // para testar requisições do backend
            ],
            providers: [ // servicos
                AuthService
            ]
        });
        service = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

    it('deve autenticar o usuário', () => {
        const fakeBody = {
            id: 1,
            nome: 'Daniele',
            email: 'danii.exe@gmail.com'
        };
        service
            .authenticate('daniele', '1234')
            .subscribe(response => {
                expect(response.body).toEqual(fakeBody);
                expect(response.headers.get('x-access-token')).toBe('tokenTest');
            });
    })
});