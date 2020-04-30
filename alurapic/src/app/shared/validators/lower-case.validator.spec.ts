import { isLowerCase } from "./lower-case.validator";

// Parametros do describe: descrição do teste, e os testes em si
describe('A função isLowerCase', () => {
    it('deve confirmar quando recebe um texto em caixa baixa', () => {
        // Preparação, execução e avaliação são as etapas de um teste
        const valor = 'daniele'; // Preparação
        const resultado = isLowerCase(valor); // Execução
        expect(resultado).toBeTruthy; // Avaliação (toBeTruthy => que seja verdadeiro)
    });
    it('deve validar quando o valor enviado não for caixa baixa', () => {
        expect(isLowerCase('Daniele')).toBeFalsy(); // tem q ser falso
    });
}) 