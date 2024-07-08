import type {} from 'cypress';
import { deleteCookie, setCookie } from '../../src/utils/cookie';
import mockTokens from '../fixtures/tokens.json';

const URL = 'http://localhost:4000';

describe('[1] - Тест проверяет страницу конструктора бургера.', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', {fixture: 'auth.json'});
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        window.localStorage.setItem('refreshToken', 
            JSON.stringify(mockTokens.accessToken));
        setCookie('accessToken', mockTokens.refreshToken);  
        cy.visit(URL);
    });

    after(() => {
        localStorage.clear();
        deleteCookie('accessToken');
    });

    describe('[1.1] - Проверка добавления ингредиентов из списка в конструктор.', () => {
        it('[1.1.1] - Проверка добаления булки в конструктор.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093c] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-constructor-type-bun-1]`).children().should('exist');
            cy.get(`[data-cy=cy-constructor-type-bun-2]`).children().should('exist');
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093c] p.counter__num`).contains('2');
        });
        it('[1.1.2] - Проверка добаления начинки в конструктор.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa0941] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-constructor-type-ingredients-643d69a5c3f7b9001cfa0941]`).should('exist');
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa0941] p.counter__num`).contains('1');
        });
    });
    describe('[1.2] - Проверка работы модальных окон.', () => {
        it('[1.2.1] - Проверка открытия модального окна ингредиента.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093e] a`).click();
            cy.get(`[data-cy=cy-modal]`).should('be.visible');
        });
        it('[1.2.2] - Проверка закрытия по клику на крестик.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093e] a`).click();
            cy.get(`[data-cy=cy-button-close-modal]`).click();
            cy.get(`[data-cy=cy-modal]`).should('not.exist');
        });
        it('[1.2.3] - Проверка закрытие по клику на оверлей.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093e] a`).click();
            cy.get(`[data-cy=cy-modal-overlay]`).click('topRight', { force: true });
            cy.get(`[data-cy=cy-modal]`).should('not.exist');
        });
    });
    describe('[1.3] - Проверка создания заказа.', () => {
        it('[1.3.1] - Проверка сборки бургера, оформление заказа, закрытие модального окна, проверка конструктора на пустоту.', () => {
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa0941] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa0946] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa0942] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-643d69a5c3f7b9001cfa093c] button`).contains('Добавить').click();
            cy.get(`[data-cy=cy-order-info] button`).contains('Оформить заказ').click();
            cy.get(`[data-cy=cy-modal] h2`).contains('45205');
            cy.get(`[data-cy=cy-button-close-modal]`).click();
            cy.get(`[data-cy=cy-modal]`).should('not.exist');
            cy.get(`[data-cy=cy-constructor-type-bun-1]`).children().should('not.exist');
            cy.get(`[data-cy=cy-constructor-type-bun-2]`).children().should('not.exist');
            cy.get(`[data-cy=cy-constructor-type-ingredients-643d69a5c3f7b9001cfa0941]`).should('not.exist');
            cy.get(`[data-cy=cy-constructor-type-ingredients-643d69a5c3f7b9001cfa0946]`).should('not.exist');
            cy.get(`[data-cy=cy-constructor-type-ingredients-643d69a5c3f7b9001cfa0942]`).should('not.exist');
        });
    });
});