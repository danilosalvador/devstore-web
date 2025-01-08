describe('Adicionar produto ao carrinho', () => {
    it('Deve ser possível navegar para a página de produto e adicionar o produto ao carrinho', () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })

    it('Não deve ser possível contar produtos duplicados no carrinho', () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()
        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })

    it('Deve ser possível procurar um produto e adicioná-lo ao carrinho', () => {
        cy.visit('http://localhost:3000')

        cy.get('input[name=q]').type('moletom').parent('form').submit()

        cy.get('a[href^="/product"]').first().click()

        cy.location('pathname').should('include', '/product')

        cy.contains('Adicionar ao carrinho').click()

        cy.contains('Cart (1)').should('exist')
    })
})
