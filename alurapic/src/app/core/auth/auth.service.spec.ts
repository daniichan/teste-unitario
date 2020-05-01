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
     // Quando realizamos o testes de uma função assíncrona, devemos envelopar nosso teste com a função ´fakeAsync()´.
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
                // Para nós conseguirmos criar a avaliação (´expect´) de um Observable, precisamos utilizar o método subscribe
                expect(response.body).toEqual(fakeBody);
                expect(spy).toHaveBeenCalledWith('tokenTest'); // verifica se as funções foram chamadas.
            });
        
        //  FAZ A REQUISICAO avalia se algum metodo do teste executou algum requisicao HTTP (rest)
        // httpMock.expectOne() retorna um objeto válido se as condições de chamada da requisição estiverem de acordo com as condições informadas nos parâmetros.
        const request = httpMock.expectOne(req => {
            return req.method === 'POST';
        });

        // RETORNO DA REQUISICAO fará o retorno da requisição
        // O objeto ´request´, criado por httpMock, serve justamente para simular uma requisição ao servidor 
        //     back-end e, assim, não precisarmos dele nos testes unitários do front-end.
        request.flush(fakeBody, { 
            headers: { 'x-access-token': 'tokenTest' }
        })

        tick(); // simula a passagem de tempo de requisição ao server
    }));



    // it("O serviço PhotoService deve retornar uma foto com um id", fakeAsync(() => {
    //     const fakePhoto = {
    //       id: 1,
    //       description: 'photo1',
    //     };
    
    //     service.getPhoto("1").subscribe(response => {
    //       expect(response.body).toEqual(fakePhoto);
    //     });
    
    //     const request = httpMock.expectOne(req => {
    //       return req.method === "GET";
    //     });
    
    //     request.flush(fakePhoto);
    
    //     tick();
    //   }));
});