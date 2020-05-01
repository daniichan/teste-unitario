import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

describe('O serviço AuthService', () => {

    let service: AuthService, httpMock: HttpTestingController, userService: UserService;

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
        userService = TestBed.get(UserService);
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

     // FAKEASYNC cria uma bolha que permite simular a passagem de tempo de resposta do servidor 
    it('deve autenticar o usuário', fakeAsync(() => {
        const fakeBody = {
            id: 1,
            nome: 'Daniele',
            email: 'danii.exe@gmail.com'
        };

        // spy uma função que cria um duble da minha classe/metodo q nao quero usar, no caso para o setToken do UserService
        // no momento que o flush fazer o retorno da requisição, vai cair no setToken (isso no service), ai ele não chamará o setToken de verdade
        //     chamará o duble
        const spy = spyOn(userService, 'setToken').and.returnValue(null);

        service
            .authenticate('daniele', '1234')
            .subscribe(response => {
                expect(response.body).toEqual(fakeBody);
                expect(spy).toHaveBeenCalledWith('tokenTest'); // verifica se as funções foram chamadas.
            });
        
        //  FAZ A REQUISICAO avalia se algum metodo do teste executou algum requisicao HTTP (rest)
        const request = httpMock.expectOne(req => {
            return req.method === 'POST';
        });

        // RETORNO DA REQUISICAO fará o retorno da requisição
        request.flush(fakeBody, { 
            headers: { 'x-access-token': 'tokenTest' }
        })

        tick(); // simula a passagem de tempo de requisição ao server
    }));
});