describe('Pesquisar produtos', () => {
    //antes de cada teste
    beforeEach(() => {
        //URL base configurada em cypress.config.ts
        cy.visit('/')
    })

    it('Deve ser possível procurar por produtos', () => {
        cy.get('input[name=q]').type('moletom').parent('form').submit()

        cy.location('pathname').should('include', '/search')
        cy.location('search').should('include', 'q=moletom')

        cy.get('a[href^="/product"]').should('exist')
    })

    it('Não deve ser possível visitar a página de buscas sem uma pesquisa', () => {
        cy.visit('/search')

        cy.location('pathname').should('equal', '/')
    })
})
