import { TokenService } from "./token.service";

describe('O serviço TokenService', () => {
    it('deve ser instanciado', () => { // teste de fumaça, verificar se a classe pode ser instanciada
        const service = new TokenService(); // Preparação e ação: Criado variavel e Instaciado o serviço
        expect(service).toBeTruthy(); // se não instanciar, service sera undefined ou nulo, por isso verifica se o service é verdadeiro
    });

    it('deve guardar um token', () => {
        const token = 'testetoken';
        const service = new TokenService();
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        expect(service.getToken()).toBe('testetoken'); // boa pratica é passar o valor e não a variável
    });
});