import { async, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./signup.component";
import { SignUpService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { RouterTestingModule } from "@angular/router/testing";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VMessageComponent } from "src/app/shared/componets/vmessage/vmessage.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('O formulário SignUp', () => {

    let component: SignUpComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SignUpComponent ],
            imports: [
                HttpClientTestingModule,
                VMessageComponent,
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
        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve ser instanciado', () => {
        expect(component).toBeTruthy();
    });

});