import Quiz from '../../client/src/components/Quiz'

describe('Quiz component', () => {
  beforeEach(() => {
    cy.mount(<Quiz />)
  })
  it('renders', () => {
    
  })
  describe('Start Quiz button', () => {
    it('should render the start quiz button if quiz not started', () => {
      cy.get('.btn').should('exist');
    })
    it('should have "Start Quiz" as label text', () => {
      cy.get('.btn').should('have.text', "Start Quiz")
    })
    it('should have "btn-primary" as class', () => {
      cy.get('.btn').should('have.class', "btn-primary")
    })
  })
  
})
