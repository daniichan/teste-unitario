import { async, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./signup.component";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { VMessageModule } from "src/app/shared/componets/vmessage/vmessage.module";

describe('O formulário SignUp', () => {

    let component: SignUpComponent, router: Router, signupService: SignUpService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SignUpComponent ],
            imports: [
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [ 
                SignUpService,
                UserNotTakenValidatorService
            ]
        }).compileComponents;
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        
        signupService = TestBed.get(SignUpService);

        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });

    it('deve cadastrar um usuário', () => {
        const navigateSpy = spyOn(router, 'navigate');

        spyOn(signupService, 'signup').and.returnValue(of (null));

        component.signupForm.get('email').setValue('daniele@daniele.com');
        component.signupForm.get('fullName').setValue('Daniele Leite');
        component.signupForm.get('userName').setValue('daniele');
        component.signupForm.get('password').setValue('123');
        component.signUp();
        
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

    it('deve realizar o log caso ocorra algum erro', () => {
        spyOn(signupService, 'signup').and.returnValue(throwError('Erro de Servidor')); // to retornando um observable de erro
        
        component.signupForm.get('email').setValue('daniele@daniele.com');
        component.signupForm.get('fullName').setValue('Daniele Leite');
        component.signupForm.get('userName').setValue('daniele');
        component.signupForm.get('password').setValue('123');

        const spyLog = spyOn(console, 'log');
        
        component.signUp();

        expect(spyLog).toHaveBeenCalledWith('Erro de Servidor');
    });

});