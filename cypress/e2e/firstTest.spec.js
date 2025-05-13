/// <references types="cypress"/>

describe('First test suite', () =>{

    it('first test', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class value
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[fullwidth]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('input[placeholder="Email"][fullwidth]')

        //by tag, attribute id and class
        cy.get('[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //get() -> find elements on the page by locator globally
        //find() -> find child element by locator
        //contains() -> find HTML,text and by text and locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')

        // cy.contains('nb-card', 'Horizontal form').contains('button','Sign in')
        cy.contains('nb-card', 'Basic form').contains('Submit')

        //Will get all buttons
        cy.contains('nb-card', 'Horizontal form').get('button')

        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click() //If there is and action command, stop the chain

    })

    it.only('save subject of the command', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        //Easier to use
        // 1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('UsingTheGrid')
        cy.get('@UsingTheGrid').find('[for="inputEmail1"]').should('contain','Email')
        cy.get('@UsingTheGrid').find('[for="inputPassword2"]').should('contain','Password')

        // 2 Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(  UsingTheGrid => {
            cy.wrap(UsingTheGrid).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(UsingTheGrid).find('[for="inputPassword2"]').should('contain','Password')
        })

    })
})