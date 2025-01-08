describe('Adicionar produto ao carrinho', () => {
    //antes de cada teste
    beforeEach(() => {
        //URL base configurada em cypress.config.ts
        cy.visit('/')
    })

    it('Deve ser possível navegar para a página de produto e adicionar o produto ao carrinho', () => {
        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })

    it('Não deve ser possível contar produtos duplicados no carrinho', () => {
        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()
        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })

    it('Deve ser possível procurar um produto e adicioná-lo ao carrinho', () => {
        cy.searchByQuery('moletom') // comando customizado em ../support/commands.ts

        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })
})
