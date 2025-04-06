describe('Registartion test_MyPrimus', () => {

  beforeEach(() => {
    cy.MyPrimusReg();
  });

  // it("verify deleting profile", () => {
  //   cy.MyPDCSupport();
  // })

      
//     it("Verify Registartion without typing anything", () => {
//     cy.Registartion1verbiageforMyPrimus();
//     cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click() // Click on continue button
//     //Term of use Error Icon
//     cy.get('.primus-login-error > .fas').should('be.visible')
//     cy.get('.form-check-label > .primus-login-error').should('contain', 'T&C checkbox is required')
//     //Accountnumber Error
//     cy.get(':nth-child(4) > .primus-login-error > .ng-tns-c7-7 > .fas').should('be.visible')
//     cy.get(':nth-child(4) > .primus-login-error > .ng-tns-c7-7').should('contain', ' Account number required')
//     //Postal code error
//     cy.get(':nth-child(5) > .primus-login-error > .ng-tns-c7-7 > .fas').should('be.visible')
//     cy.get(':nth-child(5) > .primus-login-error > .ng-tns-c7-7').should('contain', ' Postal code  required')
//     //Email address Error
//     cy.get(':nth-child(6) > .primus-login-error > .ng-tns-c7-7 > .fas').should('be.visible')
//     cy.get(':nth-child(6) > .primus-login-error > .ng-tns-c7-7').should('contain', ' Email  required')
//     })


// it("Verify Registartion Incorrect account number", () => {
//   cy.Registartion1verbiageforMyPrimus();
//   cy.get('.fsxcore-checkbox-icon').click()  //Checkmark box
//   cy.get('.fsxcore-textbox-wrapper > #primusAccountNumber').type('1235897')//Incorrect account number
//   cy.get('.fsxcore-textbox-wrapper > #postalCode').type('H3M2V9') //Correct Postal code
//   cy.get('.fsxcore-textbox-wrapper > #primusContactEmailAddress').type('divyas@gmail.com')  //Correct email address
//   cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click() // Click on continue
//   //cy.scrollTo('top', {duration:1000})
//   cy.get('.alert > :nth-child(1)').should('contain', 'The entered account number was not found. Please review and try again. If this error persists, please create a new MyPrimus username to reactivate your account.')   //Error message
// })

// it("Verify Registartion Incorrect Postal code", () => {
//   cy.Registartion1verbiageforMyPrimus();
//   cy.get('.fsxcore-checkbox-icon').click()  //Checkmark box
//   cy.get('.fsxcore-textbox-wrapper > #primusAccountNumber').type('15031368')//correct account number
//   cy.get('.fsxcore-textbox-wrapper > #postalCode').type('L8S2S1') //Correct InPostal code
//   cy.get('.fsxcore-textbox-wrapper > #primusContactEmailAddress').type('divyas@gmail.com')  //Correct email address
//   cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click() // Click on continue
//   cy.get('.alert > :nth-child(1)').should('contain', 'The entered account number was not found. Please review and try again. If this error persists, please create a new MyPrimus username to reactivate your account.')   //Error m
// })

// it("Verify Registartion Incorrect Postal code", () => {
//   cy.Registartion1verbiageforMyPrimus();
//   cy.get('.fsxcore-checkbox-icon').click()  //Checkmark box
//   cy.get('.fsxcore-textbox-wrapper > #primusAccountNumber').type('1503136')//correct account number
//   cy.get('.fsxcore-textbox-wrapper > #postalCode').type('L8S2S1') //Correct InPostal code
//   cy.get('.fsxcore-textbox-wrapper > #primusContactEmailAddress').type('diyvas@gmail.com')  //Correct email address
//   cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click() // Click on continue
//   cy.get('.alert > :nth-child(1)').should('contain', 'We cannot find an account with that email address. Please review and try again. If this error persists, please create a new MyPrimus username to reactivate your account.')
// })

// it("Verify Registartion with already registered account", () => {
//   cy.Registartion1verbiageforMyPrimus();
//   cy.get('.fsxcore-checkbox-icon').click()  //Checkmark box
//   cy.get('.fsxcore-textbox-wrapper > #primusAccountNumber').type('1502935')
//   cy.get('.fsxcore-textbox-wrapper > #postalCode').type('K1K2L2')
//   cy.get('.fsxcore-textbox-wrapper > #primusContactEmailAddress').type('divya.solanki@distributel.ca')
//   cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click() // Click on continue
//   cy.get('.alert > :nth-child(1)').should('contain', 'Profile for email address (divya.solanki@distributel.ca) already exists. Please call our Customer Service Center at 1-800-806-3273 for assistance.')
// })

it("Verify new Registartion", () => {
  cy.Registartion1verbiageforMyPrimus();
  cy.get('.fsxcore-checkbox-icon').click()  //Checkmark box
  cy.get('.fsxcore-textbox-wrapper > #primusAccountNumber').type('1502935')
  cy.get('.fsxcore-textbox-wrapper > #postalCode').type('K1K2L2')
  cy.get('.fsxcore-textbox-wrapper > #primusContactEmailAddress').type('test.auto2507@gmail.com')
  cy.get('.accept > .fsxcore-button > .fsxcore-button-button > .ng-star-inserted').click()
  cy.wait(5000)
  cy.Registartion1verbiageforMyPrimusStep2();
  cy.get('input[class^="fsxcore-textbox-input"]').first().type('Test_123')
  cy.get('.fsxcore-textbox-wrapper > #passwordConfirm').type('Test_123')
  cy.get('.accept > .fsxcore-button > .fsxcore-button-button').click()
  cy.wait(5000)
  cy.Registartion1verbiageforMyPrimusStep3();
})

})