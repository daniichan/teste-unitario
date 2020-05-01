import { async, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { UserService } from "../user/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MenuModule } from "src/app/shared/componets/menu/menu.module";
import { AlertModule } from "src/app/shared/componets/alert/alert.module";
import { LoadingModule } from "src/app/shared/componets/loading/loading.module";
import { of } from "rxjs";
import { Router } from "@angular/router";

describe('O componente Header', () => {

    let component: HeaderComponent, userService: UserService, router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [UserService],
            imports: [
                RouterTestingModule.withRoutes([]),
                MenuModule,
                AlertModule,
                LoadingModule
            ]
        }).compileComponents;
    }));

    beforeEach(() => {
        userService = TestBed.get(UserService);
        router = TestBed.get(Router);

        spyOn(userService, 'getUser').and.returnValue(of ({  //of cria um observable
            name: 'Daniele',
            email: 'danii.exe@gmail.com',
            id: 1
        }));

        const fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });

    it('deve realizar o logout', () => {
        const spy = spyOn(userService, 'logout').and.returnValue(null);
        const navigateSpy = spyOn(router, 'navigate');  //a função ´spyOn()´ cria um objeto que permite avaliar se o método foi chamado e com quais parâmetros.
        component.logout();
        expect(spy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
});