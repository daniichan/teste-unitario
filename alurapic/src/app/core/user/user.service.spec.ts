import { UserService } from "./user.service";
import { TokenService } from "../token/token.service";
import { TestBed } from "@angular/core/testing";

describe('O serviço UserService', () => {

    let service: UserService, tokenKey: string;

    beforeEach(() => {
        tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU4ODM0OTAzNiwiZXhwIjoxNTg4NDM1NDM2fQ.MfhYN0PD4APVjTt_TkAFB9UqtXQNJ3higXwWhgb2Fi4';
        // service = new UserService(new TokenService);

        // utiliza-se a classe TestBed para a criação do objeto de teste que pode conter dependências para sua instanciação
        TestBed.configureTestingModule({  // vai simular a criação do objeto através de um módulo. É um mini módulo
            providers: [ UserService ]
        });
        service = TestBed.get(UserService); // assim não preciso instanciar manualmente o meu objeto
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

    it('deve, através de um token, recuperar as informações do usuário', () => {
        service.setToken(tokenKey);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
        service.getUser().subscribe(user => {
            expect(user.name).toBe('flavio');
        });
    });

    it('deve limpar as informações no logout', () => {
        service.setToken(tokenKey);
        service.logout();
        expect(service.isLogged()).toBeFalsy();
        expect(service.getUserName()).toBe(''); // ou tobefalsy
    });
});