describe('service is available', function() {
    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });
});

describe('Drag and drop work in burger constructor', function() {
    before(function() {
       cy.visit('http://localhost:3000');
    });

    it('should add bun and increase counter', function() {
        cy.get('[class^=burger-constructor_list]', {timeout: 20000}).first().as('constructor');

        cy.get('ul[data-name="Булки"]').find('[class^=burger-ingredients_link__]').first().as('bun');
        cy.get('@bun').find('[class^=counter_counter__]').first().as('counter');

        cy.get('@counter').contains('0');
        cy.get('@bun').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@constructor').contains('булка');
        cy.get('@counter').contains('2');
   });

    it('should change bun and change counter', function() {
        cy.reload();
        cy.get('[class^=burger-constructor_list]').first().as('constructor');

        cy.get('ul[data-name="Булки"]').find('[class^=burger-ingredients_link__]').first().as('bun1');
        cy.get('ul[data-name="Булки"]').find('[class^=burger-ingredients_link__]').eq(1).as('bun2');
        cy.get('@bun1').find('[class^=counter_counter__]').first().as('counter1');
        cy.get('@bun2').find('[class^=counter_counter__]').first().as('counter2');

        cy.get('@bun1').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@counter1').contains('2');

        cy.get('@bun2').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@constructor').contains('Флюоресцентная');
        cy.get('@counter2').contains('2');
        cy.get('@counter1').contains('0');
    });

    it('should add sauce and increase counter', function() {
        cy.reload();
        cy.get('[class^=burger-constructor_list]').first().as('constructor');

        cy.get('ul[data-name="Соусы"]').find('[class^=burger-ingredients_link__]').first().as('sauce');
        cy.get('@sauce').find('[class^=counter_counter__]').first().as('counter');

        cy.get('@counter').contains('0');
        cy.get('@sauce').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@constructor').contains('Соус');
        cy.get('@counter').contains('1');
    });

    it('should add two different sauces and increases counters', function() {
        cy.reload();
        cy.get('[class^=burger-constructor_list]').first().as('constructor');

        cy.get('ul[data-name="Соусы"]').find('[class^=burger-ingredients_link__]').first().as('sauce1');
        cy.get('ul[data-name="Соусы"]').find('[class^=burger-ingredients_link__]').eq(1).as('sauce2');
        cy.get('@sauce1').find('[class^=counter_counter__]').first().as('counter1');
        cy.get('@sauce2').find('[class^=counter_counter__]').first().as('counter2');

        cy.get('@sauce1').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@sauce2').trigger('dragstart');
        cy.get('@constructor').trigger('drop');

        cy.get('@counter1').contains('1');
        cy.get('@counter2').contains('1');

        cy.get('@constructor').contains('Spicy-X');
        cy.get('@constructor').contains('Space Sauce');
    });

    it('Should remove sauce and decrease counter', function() {
        cy.reload();
        cy.get('[class^=burger-constructor_list]').first().as('constructor');

        cy.get('ul[data-name="Соусы"]').find('[class^=burger-ingredients_link__]').first().as('sauce');
        cy.get('@sauce').find('[class^=counter_counter__]').first().as('counter');

        cy.get('@sauce').trigger('dragstart');
        cy.get('@constructor').trigger('drop');
        cy.get('@counter').contains('1');
        cy.get('@constructor').contains('Соус');

        cy.get('@constructor').find('.constructor-element__action').click();
        cy.get('@counter').contains('0');
        cy.get('@constructor').should('not.contain', 'Соус');
    });

});