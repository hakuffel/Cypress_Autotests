describe('Тестирование Web Wildberries', function () {
    
    it('Поиск конкретного товара по артикулу 317606262', function () {
        cy.SearchPage();
        cy.contains('#productNmId', '317606262');
        cy.end();
     })

     it('Добавление товара в корзину', function () {
        cy.SearchPage();
        cy.get('.product-page__order-container >.order >.order__for-fixed > .order__fixed-container > .order__buttons > .order__button').click();
        cy.get('.action-notification__text').should('have.text', 'Товар добавлен в корзину');
        cy.clearCookies();
        cy.clearLocalStorage();
      })

       it('Добавление товара в избранное неавторизованным пользователем', function () {
        cy.SearchPage();
        cy.get('.product-page__to-poned > button').click();
        cy.get('.popup').contains('Войти или создать профиль');
        cy.end();
      })

      it('Копирование ссылки на товар', function () {
        cy.SearchPage();
        cy.get('.btn-share').click();
        cy.get('.button-share__button').click();
        cy.get('.action-notification__text').should('have.text', 'Ссылка скопирована');
        cy.end();
      })

})

describe('API Testing', () => {

    it('Get API Testing', () => {
        cy.request('GET', 'https://search.wb.ru/exactmatch/ru/common/v13/search?query=317606262&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false')
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.null;
        const body = JSON.parse(response.body);
        expect(body).to.have.property('metadata');
        expect(body.metadata).to.have.property('name', '317606262');
      })
  })
})