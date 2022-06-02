/// <reference types="cypress" />
/* eslint-disable no-undef*/

context('App', () => {
	it('shows cookie banner on desktop', () => {
		cy
			

			.getTestElement('cookieConsentCloseButton')
			.click()

			.getTestElement('cookiesConsent')
			.should('have.length', 0)

			.reload()
			.getTestElement('cookiesConsent')
			.should('have.length', 0);
	});

	it('shows cookie dialog on mobile', () => {
		cy
			

			.getTestElement('cookieConsentCloseButton')
			.click()

			.getTestElement('cookiesConsent')
			.should('have.length', 0)

			.reload()
			.getTestElement('cookiesConsent')
			.should('have.length', 0);
	});

	it('redirects to cjoecker', () => {
		window.localStorage.setItem('cookieConsentAccepted', 'true');
		cy.visit('/').getTestElement('cjoeckerLink').should('have.attr', 'href', 'https://www.cjoecker.de/');
	});

	

	it('persist changes', () => {
		const changedItemText = 'New item text';

		cy
			.visit('/')

			.getTestElement('decisionOptionsList')
			.within(() => {
				cy.getTestElement('entryInput').type(changedItemText).getTestElement('addButton').click();
				cy.getTestElement('itemInput').first().should('have.value', changedItemText);
			})

			.visit('/')
			.getTestElement('decisionOptionsList')
			.within(() => {
				cy.getTestElement('itemInput').first().should('have.value', changedItemText);
			});
	});

	
});
