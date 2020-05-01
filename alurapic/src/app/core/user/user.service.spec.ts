import { UserService } from "./user.service";
import { TokenService } from "../token/token.service";

describe('O serviço UserService', () => {

    let service: UserService, tokenKey: string;

    beforeEach(() => {
        tokenKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU4ODM0OTAzNiwiZXhwIjoxNTg4NDM1NDM2fQ.MfhYN0PD4APVjTt_TkAFB9UqtXQNJ3higXwWhgb2Fi4';
        service = new UserService(new TokenService);
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

    it('deve, através de um token, recuperar as informações do usuário', () => {
        service.setToken(tokenKey);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
    });
});