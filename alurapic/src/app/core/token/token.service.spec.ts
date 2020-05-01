import { TokenService } from "./token.service";

describe('O serviço TokenService', () => {

    let token, service;

    it('deve ser instanciado', () => { // teste de fumaça, verificar se a classe pode ser instanciada
        const service = new TokenService(); // Preparação e ação: Criado variavel e Instaciado o serviço
        expect(service).toBeTruthy(); // se não instanciar, service sera undefined ou nulo, por isso verifica se o service é verdadeiro
    });

    it('deve guardar um token', () => {
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe('testetoken'); // boa pratica é passar o valor e não a variável
    });

    it('deve remover um token', () => {
        service.setToken(token);
        service.removeToken();
        expect(service.hasToken()).toBeFalsy();
        expect(service.getToken()).toBeFalsy();
    });

    beforeEach(() => { // antes de cada teste, execute isso
        token = 'testetoken';
        service = new TokenService();
    });

    afterEach(() => {  // depois de cada teste, faça isso (usado para o 'lixo' não impactar outro teste)
        localStorage.clear();
    });
});