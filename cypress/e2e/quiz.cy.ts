describe('Quiz workflow', () => {
  context('Start quiz from Start Quiz button', () => {
    beforeEach(() => {
      // intercepting the GET Http request to provide mock data
      cy.fixture('question').then((fixture) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: fixture,
        }).as('getRandomQuestions');
      });

      // visit the landing page
      cy.visit('/');
    });

    it('should go over all the questions and reveal results for all correct answers', () => {
      // click on Start Quiz button
      cy.findByText('Start Quiz').click();

      // wait for the mock data response and compare
      cy.fixture('question').then((fixture) => {
        cy.wait('@getRandomQuestions');
        for (const question of fixture) {
          const answer = question.answers.map((m: any) => m.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: ${fixture.length}/${fixture.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });

    it('should go over all the questions and reveal results for all wrong answers', () => {
      // click on Start Quiz button
      cy.findByText('Start Quiz').click();

      // wait for the mock data response and compare
      cy.fixture('question').then((fixture) => {
        cy.wait('@getRandomQuestions');

        for (const question of fixture) {
          const answer = question.answers.map((m: any) => m.isCorrect).indexOf(true);
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: 0/${fixture.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });
  });

  context('Start quiz from Take New Quiz button', () => {
    beforeEach(() => {
      // intercepting the GET Http request to provide mock data
      cy.fixture('question').then((fixture) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: fixture,
        }).as('getRandomQuestions');
      });
    });

    it('should start a new quiz when clicking on Take New Quiz button', () => {
      // visit the landing page
      cy.visit('/');

      // click on Start Quiz button
      cy.findByText('Start Quiz').click();

      // wait for the mock data response and compare
      cy.fixture('question').then((fixture) => {
        cy.wait('@getRandomQuestions');

        // answering all question
        for (const question of fixture) {
          const answer = question.answers.map((m: any) => m.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        // click on Take New Quiz button
        cy.findByText('Take New Quiz').click();

        // answer all questions again
        for (const question of fixture) {
          const answer = question.answers.map((m: any) => m.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: ${fixture.length}/${fixture.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });
  });
});
