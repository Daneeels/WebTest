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

    it('save subject of the command', () => {
        
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

    it('extract text', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label =>{
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        //5
        cy.get('#exampleInputEmail1').type("test@test.com")
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then( property => {
            expect(property).to.equal('test@test.com')
        })
    })

    it('radio buttons', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( RadioButton => {
            cy.wrap(RadioButton).eq(0).check({force:true}).should('be.checked') //Don't use the {force:true} unless you know what you're doing
            cy.wrap(RadioButton).eq(1).should('not.be.checked')
            cy.wrap(RadioButton).eq(1).check({force:true})
            cy.wrap(RadioButton).eq(0).should('not.be.checked')
            cy.wrap(RadioButton).eq(2).should('be.disabled')
        })
    })

    it('checkboxes', () => {
        
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').uncheck({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).click({force:true})
    })

    it.only('date pickers', () => {
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        function selectDayFromCurrent(day){
            
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDate = date.getDate()
        let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`

            cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else{
                    cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
                }
            })
            
            return dateToAssert
        }


        cy.contains('nb-card', 'Common Datepicker').find('input').then(datePicker =>{
            
            cy.wrap(datePicker).click()

            const dateToAssert = selectDayFromCurrent(365)
            cy.wrap(datePicker).invoke('prop','value').should('contain', dateToAssert)
            cy.wrap(datePicker).should('have.value', dateToAssert)
        })
        
    })
})