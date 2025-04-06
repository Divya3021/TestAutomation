require('cy-verify-downloads').addCustomCommand();

Cypress.Commands.add('ADUserLoggedIn', () => {
 // cy.fixture("").then((usercred) => {

    // var url = usercred.url;
    var url = Cypress.env('ENV_URL');
    var userid = Cypress.env('user');
    var userpassword = Cypress.env('password')

  cy.visit(url);

    // Remove this line when the bug is fixed (UC-1719)
    cy.get('#myTab > :nth-child(1) > a').contains('Distributel AD').click()
    cy.get('#username').type(userid)
    cy.get('#password').type(userpassword)

  //cy.get('#AD > .row > .col-sm-9 > .form-horizontal > :nth-child(3) > #authtoken').type('Prometheus') // if Authentication Token is available
  cy.get('.form-horizontal').eq(0).submit()

  return cy

});



Cypress.Commands.add('ADlogin', (user, pass) => {
  cy.get('#myTab > :nth-child(1) > a').contains('Distributel AD').click()
  cy.get('#username').type(user)
  cy.get('#password').type(pass)

  // cy.get('#AD > .row > .col-sm-9 > .form-horizontal > :nth-child(3) > #authtoken').type('Prometheus') // Authentication Token
  cy.get('.form-horizontal').eq(0).submit()

  return cy

});

Cypress.Commands.add('Locallogin', (user, pass) => {
  cy.get('#myTab > li:nth-child(2) > a').contains('Local').click()
  cy.get('#DB > .row > .col-sm-9 > .form-horizontal > :nth-child(1) > #username').type(user)
  cy.get('#DB > .row > .col-sm-9 > .form-horizontal > :nth-child(2) > #password').type(pass)

  //  cy.get('#DB > .row > .col-sm-9 > .form-horizontal > :nth-child(3) > #authtoken').type('Prometheus') // Authentication Token
  cy.get('.form-horizontal').eq(1).submit()


  return cy

});


Cypress.Commands.add('CreateARM', () => {

  // Create Test Automation Account Relations Manager
  cy.get(':nth-child(1) > .dropdown-toggle').click() // Select Management dropdown
  cy.get('.open > .dropdown-menu > :nth-child(5) > a').click() // Select Agents
  cy.get('[href="/Agents/AccountRetentionManagerCreate"]').click() // Select Account Relations Manager

  var date = new Date()
  let current_date = date.getDate();
  let current_hour = date.getHours();
  let current_minutes = date.getMinutes()

  cy.get('#Name').type('Test Automation Account Relations Manager ' + current_date + current_hour + current_minutes)
  cy.get('#Username').type('ARMuser' + current_date)
  cy.get('#CreateItem').click()

  return cy

});

Cypress.Commands.add('CreateAM', () => {
  // Create Test Automation Account Manager

  cy.get(':nth-child(1) > .dropdown-toggle').click() // Select Management dropdown
  cy.get('.open > .dropdown-menu > :nth-child(5) > a').click() // Select Agents
  cy.get('[href="/Agents/AccountManagerCreate"]').click()

  var date = new Date()
  let current_date = date.getDate();
  let current_hour = date.getHours();
  let current_minutes = date.getMinutes()

  cy.get('#Name').type('Test Automation Account Manager ' + current_date + current_hour + current_minutes)
  cy.get('#Username').type('AMuser' + current_date)
  cy.get('#CreateItem').click()

  return cy
});

Cypress.Commands.add('CreateSalesAgent', () => {
  // Create Test Automation Sales Agent

  cy.get(':nth-child(1) > .dropdown-toggle').click() // Select Management dropdown
  cy.get('.open > .dropdown-menu > :nth-child(5) > a').click() // Select Agents
  cy.get('[href="/Agents/SalesAgentCreate"]').click() // Select Sales Agent

  var date = new Date()
  let current_date = date.getDate();
  let current_hour = date.getHours();
  let current_minutes = date.getMinutes()

  cy.get('#Name').type('Test Automation Sales Agent ' + current_date + current_hour + current_minutes)

  cy.get('#ParentAgentNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}')

  cy.get('#SecondaryParentAgentNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}')

  cy.get('#CreateItem').click()

  return cy
});


Cypress.Commands.add('CreateActiveAccount', (current_date, current_hour, current_minutes) => {

  cy.get('.nav > :nth-child(1) > .dropdown-toggle').click()//Click on managment
  cy.get('.open > .dropdown-menu > :nth-child(2) > a').click()//Click on Accounts
  cy.get('.btn').click() // Click on Create New

  cy.get('#account_Name').type('Test Automation Active Account' + current_date + current_hour + current_minutes)

  cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
  cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
  cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
  cy.get('#account_NewPassword').type('Testauto123') // Password
  cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
  cy.get('#account_Status_chosen > .chosen-single > span').type('Active{enter}') // Status
  cy.get('#account_V911State_chosen > .chosen-single > span').type('Northern 911{enter}')  // 911 Status
  cy.get('#account_Type_chosen > .chosen-single > span').type('Commercial{enter}')  // Type
  //cy.get('#account_Language_chosen > .chosen-single > span') // Language
  cy.get('#account_Reseller_chosen > .chosen-single > span').type('Phone Service{enter}')  // Reseller
  cy.get('#account_Priority_chosen > .chosen-single > span').type('Priority{enter}')  // Priority Account Status

  cy.get('#account_Template_chosen > .chosen-single > span').type('Distributel.2{enter}')  // Template
  cy.get(':nth-child(2) > table > tbody > :nth-child(5) > :nth-child(2) > .editor-field').type('Cheque{enter}')  // Payment Option
  cy.get('#account_InvoiceDeliveryMethod_chosen > .chosen-single').type('Email{enter}') // Invoice Delivery Method
  cy.get('#account_ChannelCommit').type('99') // Account Channel Commit
  // cy.get('#account_MinChannelCommit').type('1') // Minimum Channel Commit
  cy.get('.btn-primary').click() // Create Button


  // Address Information
  //cy.get('#Type').click() // Type dropdown
  cy.get('#OtherLabel').type('other labels') // Other Address Type Label
  cy.get('#StreetAddress').type('330 McCowan Road') // Street Address
  cy.get('#City').type('Scarborough') // City
  // cy.get('#regions').type('') // Province
  cy.get('#Postal').type('M1K1S6') // Postal Code
  cy.get('#Country').select('Canada') // Country
  cy.get('#TimeAtAddress') // Time at Address (Months)
  cy.get('#_ValidateAddress') // Validate Canadian Address


  // Contact Information
  cy.get('#Name').type('contact name1') // name
  cy.get('#Phone').type('{selectall}6472222222') // Phone Number
  cy.get('#Extension').type('2') // Extension
  cy.get('#MobilePhone').type('3333333333') // Mobile Phone
  cy.get('#Fax').type('23456') // Fax
  cy.get('#Email').type('test@distributel.ca') // Billing Email
  cy.get('#EmailAdmin').type('testadmin@distributel.ca') // Admin Email 
  cy.get('#EmailTech').type('testtech@distributel.ca') // Tech Email
  cy.get('#EmailLNP').type('testLNP@distributel.ca') // Port Notification Email
  cy.get('#SpecialInstructions').type('this is special instruction') // Special Instructions

  cy.get('.btn-primary').click() // Create Button

  return cy

});

Cypress.Commands.add('CreateServiceScheduleSmallBusiness', () => {

  // ============================ Create a Small Business Service Schedule =================
  cy.get('*[href^="/ServiceSchedules/Account/"]').click() //Click the service schedules tab from the Account
  cy.get('fieldset > .btn-group > .btn').click()//Click on create new button for service schedule

  cy.get('#Template_chosen').type('Small Business{enter}') //template Small Business

  cy.get('#Name_En').type('test.automation service schedule 1')//Name of service schedule in english
  cy.get('#Name_Fr').type('Calendrier du service test.automation 1')//Name of service schedule in French

  cy.get('#Type_chosen > .chosen-single > span').type('Customer{enter}')//Type 
  cy.get('#PeriodType_chosen > .chosen-single > span').type('Month to Month{enter}')// Term- "Month to month"

  cy.get(':nth-child(6) > .editor-label > label').should('contain', 'Commencement Date')//Commencement should be visisble
  cy.get('#endDate > .editor-label > label').should('contain', 'Expiry Date')//Expiry date should be visible
  cy.get('#Notes').type('This is for testing purpose') // type a note
  cy.get('#PrivateStaffNotes').type('Test Purpose') // Non-visible note
  cy.get('#CreateItem').click()//create a service schedule

  return cy

});

Cypress.Commands.add('CreateServiceScheduleWhiteLabel', () => {

  // ============================ Create a White Label Service Schedule =================
  cy.get('*[href^="/ServiceSchedules/Account/"]').click() //Click the service schedules tab from the Account
  cy.get('fieldset > .btn-group > .btn').click()//Click on create new button for service schedule

  cy.get('#Template_chosen').type('White Label{enter}')// template "White Label"

  cy.get('#Name_En').type('test.automation service schedule 1')//Name of service schedule in english
  cy.get('#Name_Fr').type('Calendrier du service test.automation 1')//Name of service schedule in French

  cy.get('#Type_chosen > .chosen-single > span').type('Customer{enter}')//Type 
  cy.get('#PeriodType_chosen > .chosen-single > span').type('Month to Month{enter}')// Term- "Month to month"

  cy.get(':nth-child(6) > .editor-label > label').should('contain', 'Commencement Date')//Commencement should be visible
  cy.get('#endDate > .editor-label > label').should('contain', 'Expiry Date')//Expiry date should be visible
  cy.get('#Notes').type('This is for testing purpose') // type a note
  cy.get('#PrivateStaffNotes').type('Test Purpose') // Non-visible note
  cy.get('#CreateItem').click()//create a service schedule


  return cy

});


Cypress.Commands.add('AddProductStandardRetailSIP', () => {

  // =========================== Add product (SIP Trunking (Retail)) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('SIP Trunking (Retail){enter}') //Selecting Product Family
  cy.get('#ProductID').select('Standard Retail Sip Trunk') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit


  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product Standard Retail Sip Trunk En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product Standard Retail Sip Trunk Fr ') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST

  cy.wait(5000)
  return cy

});




Cypress.Commands.add('AddProductbasicphone', () => {

  // =========================== Add product (Hosted PBX-Basic phone line) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('Hosted PBX{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Basic Phone Line') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Hosted PBX phone test automation En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Hosted PBX phone Virtual fax test automation Fr') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)
  return cy

});


Cypress.Commands.add('AddProductFaxToInbox', () => {

  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('Virtual Fax{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Fax to inbox') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Virtual fax to inbox test automation En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Virtual fax to inbox test automation Fr') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)

  return cy

});


Cypress.Commands.add('AddProductMeteredSIPTrunk', () => {

  // =========================== Add product (Metered SIP Trunking (White Label)) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('White Label{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Metered SIP Trunk') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  //let random_number = Math.random();
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product Metered Sip Trunk En ') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product Metered Sip Trunk Fr ') //Label in French
  cy.get('.btn-primary').click() //Click on Save

   // ========================= Post the Service Schedule ===============================
   cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
   cy.wait(5000)

  return cy

});


Cypress.Commands.add('AddProductPrintToFax', () => {

  // =========================== Add product Print to Fax  =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('Virtual Fax{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Print to fax') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit


  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Virtual fax test automation En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Virtual fax test automation Fr') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)

  return cy

});

Cypress.Commands.add('AddProductReservationTrunk', () => {

  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('Demo Products{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Reservation Trunk') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  //let random_number = Math.random();
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product test Reservation Trunk En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product test Reservation Trunk Fr ') //Label in French

  cy.get('#compositeServiceScheduleProduct__currentSkuGroups_0__CompositeSkus_0__ServiceScheduleSku_IncludedQty').type('1') // Type Quality for DID reservation
  cy.get('.btn-primary').click() //Click on Save


  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)

  return cy

});

Cypress.Commands.add('AddProductRetailMetered', () => {

  // =========================== Add product (SIP Trunking (Retail)) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product

  cy.get('.chosen-single').type('SIP Trunking (Retail){enter}') //Selecting Product Family
  cy.get('#ProductID').select('Retail Metered SIP Trunk') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  //let random_number = Math.random();
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product  Retail Metered Sip Trunk En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product  Retail Metered Sip Trunk Fr ') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)
  return cy

});

Cypress.Commands.add('AddProductT38Fax', () => {

  // =========================== Add product (T.38 Fax) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('White Label{enter}') //Selecting Product Family
  cy.get('#ProductID').select('T.38 Fax') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit

  //let random_number = Math.random();
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product T.38 Fax En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product T.38 Fax Fr ') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)

  return cy

});


Cypress.Commands.add('AddProductTelax2023', () => {

  // =========================== Add product (Telax 2023) to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product
  cy.get('.chosen-single').type('Telax{enter}') //Selecting Product Family
  cy.get('#ProductID').select('Telax 2023') // Selecting the Product
  cy.get('.btn-primary').click() //Click on Submit
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Product Standard Retail Sip Trunk En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Product Standard Retail Sip Trunk Fr ') //Label in French
  cy.get('.btn-primary').click() //Click on Save

  // ========================= Post the Service Schedule ===============================
  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST
  cy.wait(5000)

  return cy

});

Cypress.Commands.add('AddProductHostedPBX', () => {

  // =========================== Add product: Hosted PBX to the above service schedule =================
  cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product

  cy.get('.chosen-single').type('Hosted PBX{enter}') //Selecting Product Family

  cy.get('.btn-primary').click() //Click on Submit

  //let random_number2 = Math.random();
  cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('Primus Hosted Product test automation En') //Label in English
  cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('Primus Hosted Product test automation Fr') //Label in French

  cy.get('.btn-primary').click() //Click on Save


  // ========================= Post the Service Schedule ===============================

  cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST

  return cy

});

Cypress.Commands.add('AddProductPermanentCallForward', () => {    

  // =========================== Add product3 (Permanent Call Forward)) to the above service schedule =================

cy.get('*[href^="/ServiceSchedules/AddProduct/"]').click() //Click on Add Product

cy.get('.chosen-single').type('Hosted PBX{enter}') //Selecting Product Family
cy.get('#ProductID').select('Permanent Call Forward') // Selecting the Product

cy.get('.btn-primary').click() //Click on Submit

//let random_number2 = Math.random();
cy.get('#compositeServiceScheduleProduct_offering_Label_En').type('911 Municiple') //Label in English
cy.get('#compositeServiceScheduleProduct_offering_Label_Fr').type('911 Municiple') //Label in French

cy.get('.btn-primary').click() //Click on Save

// ========================= Post the Service Schedule ===============================

cy.get('*[href^="/ServiceSchedules/Post/"]').click() //Click on POST

return cy

})


Cypress.Commands.add('ValidateSIPBinding', () => {

  cy.get(':nth-child(1) > :nth-child(2) > legend').should('contain', 'Configured SIP Binding') // Validate the Configured SIP Binding section
  cy.get(':nth-child(1) > :nth-child(2) > legend').should('contain', 'Test Automation')


  var contact_endpoint = cy.get(':nth-child(2) > .table > tbody > :nth-child(1) > :nth-child(2) > .display-field').invoke('attr', 'value')
  expect(contact_endpoint).not.equal(null)

  var proxy_endpoint = cy.get(':nth-child(2) > .table > tbody > :nth-child(2) > :nth-child(2) > .display-field').invoke('attr', 'value')
  expect(proxy_endpoint).not.equal(null)

  var sip_domainname = cy.get(':nth-child(2) > .table > tbody > :nth-child(3) > :nth-child(2) > .display-field').invoke('attr', 'value')
  expect(sip_domainname).not.equal(null)

  cy.get(':nth-child(2) > .table > tbody > :nth-child(4) > :nth-child(2) > .display-field').should('contain', 'True') // By default Enable is True for the SIP Binding

  cy.get(':nth-child(2) > .table > tbody > :nth-child(5) > :nth-child(2) > .display-field').should('contain', '1')   // Maximum default channel is 1

  cy.get(':nth-child(2) > .table > tbody > :nth-child(6) > :nth-child(2) > .display-field').should('contain', '1024') // Binding Maximum channel is 1024

  return cy

});



Cypress.Commands.add('OrderStandardRetailSIP', () => {

  // ========================= Order a Service for product: Standard Retail Sip Trunk ==========================================
  cy.get('*[href^="/Subscriptions/Account/"]').click() // Click on Subscription

  // cy.get('fieldset > .btn-group > .btn').click() // Click on order 

  // cy.contains('Standard Retail Sip Trunk').click() // Standard Retail Sip Trunk

  // Order a inventory for standard Retail SIP Trunk
  cy.get('#RateCenterName').select('Acton-Vale, QC') // Rate Center
  cy.get('#numberList').select('Next Available') // Number
  cy.get('#Proxy').select('Western SIP Trunk (edm.trk.tprm.ca)') // Proxy

  // Generate 3 digit random number for new IP generation (should be less than 255)
  var threedigit_random_number = Math.floor(Math.random() * 255);
  cy.get('#IPAddress1').type(threedigit_random_number + '.' + threedigit_random_number + '.' + threedigit_random_number + '.6') // IP EndPoint
  cy.get('.btn-primary').click() //Create the order
  cy.wait(5000)
  return cy

});

Cypress.Commands.add('SubscriptionsforPCF', () => {

  // ========================= Order a Service for product: Permenant call Forwarding  ==========================================

  cy.get('*[href^="/Subscriptions/Account/"]').click() //Click on Subscription

  cy.get('fieldset > .btn-group > .btn').click() // Click on order 

  cy.contains('Permanent Call Forward').click()

  // Order a inventory for Permanent Call Forward

  cy.get('#RateCenterName').select('Toronto, ON') // Rate Center

  cy.get('#numberList').select('Next Available') // Number

  cy.get('#CallForwardingNumber').type('9999991048') // Call forwading number

  cy.get('#CreateItem').click() // Click on create 


  return cy


});

Cypress.Commands.add('ProductTableValidation', () => {

  cy.get(':nth-child(4) > .ProductSkuTable > thead > tr > :nth-child(2)').should('contain', 'Description')
  cy.get(':nth-child(4) > .ProductSkuTable > thead > tr > :nth-child(3)').should('contain', 'Included Quantity')
  cy.get(':nth-child(4) > .ProductSkuTable > thead > tr > :nth-child(4)').should('contain', 'Monthly Price')
  cy.get(':nth-child(4) > .ProductSkuTable > thead > tr > :nth-child(5)').should('contain', 'One-Time Price')
  return cy

});


Cypress.Commands.add('ServiceScheduleDataValidation', () => {

  cy.get(':nth-child(6) > .editor-label > label').should('contain', 'Commencement Date')//Commencement should be visisble
  cy.get('#endDate > .editor-label > label').should('contain', 'Expiry Date')//Expiry date should be visible
  cy.get('#Notes').type('This is for testing purpose') // type a note
  cy.get('#PrivateStaffNotes').type('Test Purpose') // Non-visible note
  cy.get('#CreateItem').click()//create a service schedule

  cy.url().then(url => {
    let servicescheduleid = null
    servicescheduleid = url.split('/ServiceSchedules/Details/')[1]; //grab the service id from URl
    //console.log(servicescheduleid)
    cy.get('.nav > :nth-child(1) > .dropdown-toggle').click()//Clcik on managment
    cy.get(':nth-child(19) > a').click()//clcik on service schedule
    cy.get('#table_filter > label > .form-control').type(servicescheduleid)
    cy.get('[href="/ServiceSchedules/Details\/' + servicescheduleid + '"]').click()

    cy.get('#content > :nth-child(2)').find('a')
      .each($a => {

        expect($a).to.have.attr("href").contain(servicescheduleid);
      });
    cy.get('.editor-field > a').should('contain', 'Test Automation Active')   //Account
    cy.get(':nth-child(2) > :nth-child(2) > .editor-field').should('contain', 'test.automation service schedule') //Quote Name (En)
    cy.get(':nth-child(3) > :nth-child(2) > .editor-field').should('contain', 'Calendrier du service test.automation') //Quote Name (FR)
    //cy.get(':nth-child(5) > :nth-child(2) > .editor-field').should('contain', '2022')//Commencement Date
    cy.get('.SchedValue > a').should('contain', 'Test Automation Active')//Customer
    //cy.get(':nth-child(3) > [style="width:100%"] > :nth-child(1) > :nth-child(1) > [style="width:50%;vertical-align:top;padding-right:40px;"] > .SchedTable > tbody > :nth-child(1) > .SchedValue').should('contain', '20007476') //Type
    cy.get(':nth-child(6) > .SchedValue').should('contain', 'test@distributel.ca')//Billing Email	
    cy.get(':nth-child(7) > .SchedValue').should('contain', 'testtech@distributel.ca') //Tech Email	    
    cy.get(':nth-child(8) > .SchedValue').should('contain', 'testadmin@distributel.ca') //Admin Email   
    //cy.get('[style="width:50%;vertical-align:top;padding-left:40px;"] > .SchedTable > tbody > :nth-child(1) > .SchedValue').should('contain', '2022')//Last Modified Date
    cy.get('[style="width:50%;vertical-align:top;padding-left:40px;"] > .SchedTable > tbody > :nth-child(5) > .SchedValue').should('contain', '(866) 928-4465')//Toll Free


  })
  return cy
});



Cypress.Commands.add('CreateProduct', (random_number) => {

  // Create a Product
  cy.get(':nth-child(2) > .dropdown-toggle').click() //Click on Products from the top menu
  cy.get('.open > .dropdown-menu > :nth-child(6) > a').click() //Click on Products from the menu
  cy.get('.btn').click() //Click on Create New
  cy.get('#Name_En').type('test.productEn' + random_number) //Name in English
  cy.get('#Name_Fr').type('test.productFr' + random_number) //Name in French
  // cy.get('#StartDate').clear().type('2022-08-10') //Start Date
  // cy.get('#EndDate').clear().type('2022-12-30')//End Date
  cy.get('.btn-primary').click()
  cy.wait(5000)
  cy.get('#Description_En').type('This is a product description in Eng') //Des in Eng
  cy.get('#Description_Fr').type('Exactement 2 une description du produit en français') //Des in French
  cy.get('p > .btn-primary').click()
  return cy

});

Cypress.Commands.add('Add911Municipal', () => {
cy.wait(10000)
cy.url().then(url => {
          let accountId = null;
          accountId = url.split('/Account/')[1]; // Extract the dynamic account ID
        
          cy.get('*[href^="/V911s/Account/"]', { timeout: 3000 }).click()
          cy.get('fieldset > :nth-child(1) > .btn').click() //click on create 
          cy.get('[value="MunicipalAddress"]').click() // Municpal address

          cy.get('#Number').invoke('val').then((Number) => {
              cy.get('#Numbers').type(Number)
          })

          cy.get('#FirstName').type('QA') // First Name
          cy.get('#LastName').type('QA Test') // Last name
          cy.get('#StreetNumber').type('778') // Street number
          cy.get('#StreetName').type('Cummings Ave') //Street name
          cy.get('#City').type('OTTAWA') //City
          cy.get('#ProvinceState').select('Ontario') //Province
          cy.get('#PostalZip').type('K1K2L2') // Postel
          cy.get('#TransactionType').select('Add') // Transaction Type
          cy.get('#btnValid').click() // Click create button
})
return cy

});

