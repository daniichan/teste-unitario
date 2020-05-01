import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from "./footer.component";
import { UserService } from "../user/user.service";
import { of } from "rxjs";

describe('O componente Footer', () => {

    let component: FooterComponent;

    // boas praticas do angular, pede para criar dois beforeeach 1 async e outro nao
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FooterComponent ], // COMPONENTS
            // routertestingmodule testa rotas
            imports: [ RouterTestingModule ], // MODULES
            providers: [ UserService ] // SERVICES,
        }).compileComponents(); // boa pratica. ele é assincrono
    }));
    
    beforeEach(() => {
        const userService = TestBed.get(UserService);
        spyOn(userService, 'getUser').and.returnValue(of({
            email: 'danii.exe@gmail.com',
            name: 'Daniele',
            id: 1
        }));

        const fixture = TestBed.createComponent(FooterComponent); // Para criar o componente
        component = fixture.componentInstance; // Extrair o componente
        fixture.detectChanges(); // Para executar os métodos de ciclo de vida do componente
    });

    // teste de fumaça: instanciar a classe
    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });
});