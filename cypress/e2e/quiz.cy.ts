import questions from '../fixtures/question.json'

describe('Quiz workflow', () => {
  it('should go over all the questions and reveal results', () => {
    // intercepting the GET Http request to provide mock data
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: questions
    })

    // visit the landing page
    cy.visit('/')

    // click on start the quiz button
    cy.get('.btn').click()

    // clicking on answer buttons for as many questions provided by the mock data
    for (const _ of questions) {
      cy.get('.btn.btn-primary:not(d-inline-block):nth(1)').click()
    }
    
    cy.get('.card').should('be.visible')

    cy.get('h2').should('be.visible')
    cy.get('h2').should('have.text', 'Quiz Completed')

    cy.get('.alert').should('be.visible')
    cy.get('.alert').should('have.text', `Your score: ${questions.length}/${questions.length}`)

    cy.get('.btn').should('be.visible')
    cy.get('.btn').should('be.enabled')
    cy.get('.btn').should('have.text', 'Take New Quiz')
  })
})
