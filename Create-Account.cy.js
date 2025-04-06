describe("Account Creation from Management Menu", () => {

    before(() => {

        cy.ADUserLoggedIn();
        cy.get('#searchButton').should('exist')
        cy.get('#searchBox').should('exist')

        cy.CreateARM();
        cy.CreateAM();
        cy.CreateSalesAgent();
    });

    beforeEach(() => {
        cy.ADUserLoggedIn();
        cy.get('#searchButton').should('exist')
        cy.get('#searchBox').should('exist')

        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click()//Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click()//Click on Accounts
        cy.get('.btn').click() // Click on Create New
    });

    it("Create a priority active account with Distributel.2 template, disabled 911 and Commercial type", function () {

        let random_number = Math.random();
        cy.get('#account_Name').type('Test Automation Account' + random_number)
        cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
        cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
        cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
        cy.get('#account_NewPassword').type('Testauto123') // Password
        cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
        cy.get('#account_Status_chosen > .chosen-single > span').type('Active{enter}') // Status
        cy.get('#account_V911State_chosen > .chosen-single > span').type('Disabled{enter}')  // 911 Status
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

        cy.get('#content > .navbar > .navbar-header > .navbar-brand').should('contain', 'Priority Account')

        // Top navigation tabs
        cy.get('#content > .navbar').should('contain', 'Account')
        cy.get('#content > .navbar').should('contain', 'Addresses')
        cy.get('#content > .navbar').should('contain', 'Numbers')
        cy.get('#content > .navbar').should('contain', 'Invoices')
        cy.get('#content > .navbar').should('contain', 'Payments')
        cy.get('#content > .navbar').should('contain', 'AR History')
        cy.get('#content > .navbar').should('contain', 'Charges')
        cy.get('#content > .navbar').should('contain', 'Subscriptions')
        cy.get('#content > .navbar').should('contain', 'Service Schedules')

        cy.get('#content > :nth-child(4)').should('contain', '330 McCowan Road')
        cy.get('#content > :nth-child(4)').should('contain', 'Scarborough')
        cy.get('#content > :nth-child(4)').should('contain', 'AB')
        cy.get('#content > :nth-child(4)').should('contain', 'M1K 1S6')
        cy.get('#content > :nth-child(4)').should('contain', 'CA')

        cy.get('#content > :nth-child(5)').should('contain', 'contact name1')
        cy.get('#content > :nth-child(5)').should('contain', '6472222222 2')
        cy.get('#content > :nth-child(5)').should('contain', '3333333333')
        cy.get('#content > :nth-child(5)').should('contain', '23456')
        cy.get('#content > :nth-child(5)').should('contain', 'test@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testadmin@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testtech@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testLNP@distributel.ca')

        cy.get('#content > :nth-child(6)').should('contain', 'this is special instruction')

        // Search the newly created account in the Accounts List
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click() //Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click() //Click on Accounts

        cy.get('#Accounts_filter > label > .form-control').type('Test Automation Account' + random_number)
        cy.get('.odd > .uc-brk').should('contain', 'Test Automation Account' + random_number) // Validate Account Name
        cy.wait(2000)
        cy.get('.odd > :nth-child(3)').should('contain', 'Commercial') // Validate the type
        cy.get('.odd > :nth-child(4)').should('contain', 'Active') // Validate Status
        cy.get('.odd > :nth-child(5)').should('contain', 'Test Automation Contact') // Validate Contact
        cy.get('.odd > :nth-child(6)').should('contain', 'Test Automation Account Manager') // Validate Rep
        cy.get('.odd > .uc-action-80').should('contain', 'Details') // Validate Details link
        cy.get('.odd > .uc-action-80').should('contain', 'Edit') // Validate Edit Link



    })

    it("Create a normal active account with ThinkTelCAD.2 template, disabled 911 and Wholesale type", function () {
        let random_number = Math.random();
        cy.get('#account_Name').type('Test Automation Account' + random_number)
        cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
        cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
        cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
        cy.get('#account_NewPassword').type('Testauto123') // Password
        cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
        cy.get('#account_Status_chosen > .chosen-single > span').type('Active{enter}') // Status
        cy.get('#account_V911State_chosen > .chosen-single > span').type('Disabled{enter}')  // 911 Status
        cy.get('#account_Type_chosen > .chosen-single > span').type('Wholesale{enter}')  // Type
        //cy.get('#account_Language_chosen > .chosen-single > span') // Language
        cy.get('#account_Reseller_chosen > .chosen-single > span').type('Phone Service{enter}')  // Reseller
        cy.get('#account_Priority_chosen > .chosen-single > span').type('Normal{enter}')  // Priority Account Status

        cy.get('#account_Template_chosen > .chosen-single > span').type('ThinkTelCAD.2{enter}')  // Template
        cy.get(':nth-child(2) > table > tbody > :nth-child(5) > :nth-child(2) > .editor-field').type('Wire Transfer{enter}')  // Payment Option
        cy.get('#account_InvoiceDeliveryMethod_chosen > .chosen-single').type('Email Portal Link{enter}') // Invoice Delivery Method
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

        cy.get('#content > .navbar > .navbar-header > .navbar-brand').should('not.contain', 'Priority Account')

        // Top navigation tabs
        cy.get('#content > .navbar').should('contain', 'Account')
        cy.get('#content > .navbar').should('contain', 'Addresses')
        cy.get('#content > .navbar').should('contain', 'Numbers')
        cy.get('#content > .navbar').should('contain', 'Invoices')
        cy.get('#content > .navbar').should('contain', 'Payments')
        cy.get('#content > .navbar').should('contain', 'AR History')
        cy.get('#content > .navbar').should('contain', 'Charges')
        cy.get('#content > .navbar').should('contain', 'Subscriptions')
        cy.get('#content > .navbar').should('contain', 'Service Schedules')

        cy.get('#content > :nth-child(4)').should('contain', '330 McCowan Road')
        cy.get('#content > :nth-child(4)').should('contain', 'Scarborough')
        cy.get('#content > :nth-child(4)').should('contain', 'AB')
        cy.get('#content > :nth-child(4)').should('contain', 'M1K 1S6')
        cy.get('#content > :nth-child(4)').should('contain', 'CA')

        cy.get('#content > :nth-child(5)').should('contain', 'contact name1')
        cy.get('#content > :nth-child(5)').should('contain', '6472222222 2')
        cy.get('#content > :nth-child(5)').should('contain', '3333333333')
        cy.get('#content > :nth-child(5)').should('contain', '23456')
        cy.get('#content > :nth-child(5)').should('contain', 'test@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testadmin@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testtech@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testLNP@distributel.ca')

        cy.get('#content > :nth-child(6)').should('contain', 'this is special instruction')

        // Search the newly created account in the Accounts List
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click() //Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click() //Click on Accounts

        cy.get('#Accounts_filter > label > .form-control').type('Test Automation Account' + random_number)
        cy.get('.odd > .uc-brk').should('contain', 'Test Automation Account' + random_number) // Validate Account Name
        cy.wait(2000)
        cy.get('.odd > :nth-child(3)').should('contain', 'Wholesale') // Validate the type
        cy.get('.odd > :nth-child(4)').should('contain', 'Active') // Validate Status
        cy.get('.odd > :nth-child(5)').should('contain', 'Test Automation Contact') // Validate Contact
        cy.get('.odd > :nth-child(6)').should('contain', 'Test Automation Account Manager') // Validate Rep
        cy.get('.odd > .uc-action-80').should('contain', 'Details') // Validate Details link
        cy.get('.odd > .uc-action-80').should('contain', 'Edit') // Validate Edit Link

    })

    it("Create a normal Demo account with NavigataCAD.1 template, Northern 911 and Residential type", function () {


        let random_number = Math.random();
        cy.get('#account_Name').type('Test Automation Account' + random_number)
        cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
        cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
        cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
        cy.get('#account_NewPassword').type('Testauto123') // Password
        cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
        cy.get('#account_Status_chosen > .chosen-single > span').type('Demo{enter}') // Status
        cy.get('#account_V911State_chosen > .chosen-single > span').type('Northern 911{enter}')  // 911 Status
        cy.get('#account_Type_chosen > .chosen-single > span').type('Residential{enter}')  // Type
        //cy.get('#account_Language_chosen > .chosen-single > span') // Language
        cy.get('#account_Reseller_chosen > .chosen-single > span').type('Phone Service{enter}')  // Reseller
        cy.get('#account_Priority_chosen > .chosen-single > span').type('Normal{enter}')  // Priority Account Status

        cy.get('#account_Template_chosen > .chosen-single > span').type('NavigataCAD.1{enter}')  // Template
        cy.get(':nth-child(2) > table > tbody > :nth-child(5) > :nth-child(2) > .editor-field').type('None{enter}')  // Payment Option
        cy.get('#account_InvoiceDeliveryMethod_chosen > .chosen-single').type('Print And Email{enter}') // Invoice Delivery Method
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

        cy.get('#content > .navbar > .navbar-header > .navbar-brand').should('not.contain', 'Priority Account')

        // Top navigation tabs
        cy.get('#content > .navbar').should('contain', 'Account')
        cy.get('#content > .navbar').should('contain', 'Addresses')
        cy.get('#content > .navbar').should('contain', 'Numbers')
        cy.get('#content > .navbar').should('contain', 'Invoices')
        cy.get('#content > .navbar').should('contain', 'Payments')
        cy.get('#content > .navbar').should('contain', 'AR History')
        cy.get('#content > .navbar').should('contain', 'Charges')
        cy.get('#content > .navbar').should('contain', 'Subscriptions')
        cy.get('#content > .navbar').should('contain', 'Service Schedules')

        cy.get('#content > :nth-child(4)').should('contain', '330 McCowan Road')
        cy.get('#content > :nth-child(4)').should('contain', 'Scarborough')
        cy.get('#content > :nth-child(4)').should('contain', 'AB')
        cy.get('#content > :nth-child(4)').should('contain', 'M1K 1S6')
        cy.get('#content > :nth-child(4)').should('contain', 'CA')

        cy.get('#content > :nth-child(5)').should('contain', 'contact name1')
        cy.get('#content > :nth-child(5)').should('contain', '6472222222 2')
        cy.get('#content > :nth-child(5)').should('contain', '3333333333')
        cy.get('#content > :nth-child(5)').should('contain', '23456')
        cy.get('#content > :nth-child(5)').should('contain', 'test@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testadmin@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testtech@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testLNP@distributel.ca')

        cy.get('#content > :nth-child(6)').should('contain', 'this is special instruction')

        // Search the newly created account in the Accounts List
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click() //Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click() //Click on Accounts

        cy.get('#Accounts_filter > label > .form-control').type('Test Automation Account' + random_number)
        cy.get('.odd > .uc-brk').should('contain', 'Test Automation Account' + random_number) // Validate Account Name
        cy.wait(2000)
        cy.get('.odd > :nth-child(3)').should('contain', 'Residential') // Validate the type
        cy.get('.odd > :nth-child(4)').should('contain', 'Demo') // Validate Status
        cy.get('.odd > :nth-child(5)').should('contain', 'Test Automation Contact') // Validate Contact
        cy.get('.odd > :nth-child(6)').should('contain', 'Test Automation Account Manager') // Validate Rep
        cy.get('.odd > .uc-action-80').should('contain', 'Details') // Validate Details link
        cy.get('.odd > .uc-action-80').should('contain', 'Edit') // Validate Edit Link

    })

    it("Create a normal Demo account with DistributelWholesaleCAD.1 template, E-911 and White Label type", function () {

        let random_number = Math.random();
        cy.get('#account_Name').type('Test Automation Account' + random_number)
        cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
        cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
        cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
        cy.get('#account_NewPassword').type('Testauto123') // Password
        cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
        cy.get('#account_Status_chosen > .chosen-single > span').type('Demo{enter}') // Status
        cy.get('#account_V911State_chosen > .chosen-single > span').type('E-911{enter}')  // 911 Status
        cy.get('#account_Type_chosen > .chosen-single > span').type('White Label{enter}')  // Type
        //cy.get('#account_Language_chosen > .chosen-single > span') // Language
        cy.get('#account_Reseller_chosen > .chosen-single > span').type('Phone Service{enter}')  // Reseller
        cy.get('#account_Priority_chosen > .chosen-single > span').type('Normal{enter}')  // Priority Account Status

        cy.get('#account_Template_chosen > .chosen-single > span').type('DistributelWholesaleCAD.1{enter}')  // Template
        cy.get(':nth-child(2) > table > tbody > :nth-child(5) > :nth-child(2) > .editor-field').type('Pre-Authorized Credit Card{enter}')  // Payment Option
        cy.get('#account_InvoiceDeliveryMethod_chosen > .chosen-single').type('Fax{enter}') // Invoice Delivery Method
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

        cy.get('#content > .navbar > .navbar-header > .navbar-brand').should('not.contain', 'Priority Account')

        // Top navigation tabs
        cy.get('#content > .navbar').should('contain', 'Account')
        cy.get('#content > .navbar').should('contain', 'Addresses')
        cy.get('#content > .navbar').should('contain', 'Numbers')
        cy.get('#content > .navbar').should('contain', 'Invoices')
        cy.get('#content > .navbar').should('contain', 'Payments')
        cy.get('#content > .navbar').should('contain', 'AR History')
        cy.get('#content > .navbar').should('contain', 'Charges')
        cy.get('#content > .navbar').should('contain', 'Subscriptions')
        cy.get('#content > .navbar').should('contain', 'Service Schedules')

        cy.get('#content > :nth-child(4)').should('contain', '330 McCowan Road')
        cy.get('#content > :nth-child(4)').should('contain', 'Scarborough')
        cy.get('#content > :nth-child(4)').should('contain', 'AB')
        cy.get('#content > :nth-child(4)').should('contain', 'M1K 1S6')
        cy.get('#content > :nth-child(4)').should('contain', 'CA')

        cy.get('#content > :nth-child(5)').should('contain', 'contact name1')
        cy.get('#content > :nth-child(5)').should('contain', '6472222222 2')
        cy.get('#content > :nth-child(5)').should('contain', '3333333333')
        cy.get('#content > :nth-child(5)').should('contain', '23456')
        cy.get('#content > :nth-child(5)').should('contain', 'test@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testadmin@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testtech@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testLNP@distributel.ca')

        cy.get('#content > :nth-child(6)').should('contain', 'this is special instruction')

        // Search the newly created account in the Accounts List
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click() //Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click() //Click on Accounts

        cy.get('#Accounts_filter > label > .form-control').type('Test Automation Account' + random_number)
        cy.get('.odd > .uc-brk').should('contain', 'Test Automation Account' + random_number) // Validate Account Name
        cy.wait(2000)
        cy.get('.odd > :nth-child(3)').should('contain', 'White Label') // Validate the type
        cy.get('.odd > :nth-child(4)').should('contain', 'Demo') // Validate Status
        cy.get('.odd > :nth-child(5)').should('contain', 'Test Automation Contact') // Validate Contact
        cy.get('.odd > :nth-child(6)').should('contain', 'Test Automation Account Manager') // Validate Rep
        cy.get('.odd > .uc-action-80').should('contain', 'Details') // Validate Details link
        cy.get('.odd > .uc-action-80').should('contain', 'Edit') // Validate Edit Link

    })

    it("Create a priority Suppressed account with ThinkTelUSD.2 template, E-911, Carrier type and French language", function () {

        let random_number = Math.random();
        cy.get('#account_Name').type('Test Automation Account' + random_number)
        cy.get('#accountManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Manager{enter}') // Account Manager
        cy.get('#salesAgentNumber_chosen > .chosen-single > span').type('Test Automation Sales Agent{enter}') // Sales Agent
        cy.get('#accountRetentionManagerNumber_chosen > .chosen-single > span').type('Test Automation Account Relations Manager{enter}') // Account Relation Manager
        cy.get('#account_NewPassword').type('Testauto123') // Password
        cy.get('#account_ContactName').type('Test Automation Contact') // Contact Name
        cy.get('#account_Status_chosen > .chosen-single > span').type('Suppressed{enter}') // Status
        cy.get('#account_V911State_chosen > .chosen-single > span').type('E-911{enter}')  // 911 Status
        cy.get('#account_Type_chosen > .chosen-single > span').type('Carrier{enter}')  // Type
        cy.get('#account_Language_chosen > .chosen-single > span').type('French{enter}') // French Language
        cy.get('#account_Reseller_chosen > .chosen-single > span').type('No{enter}')  // Reseller
        cy.get('#account_Priority_chosen > .chosen-single > span').type('Priority{enter}')  // Priority Account Status

        cy.get('#account_Template_chosen > .chosen-single > span').type('ThinkTelUSD.2{enter}')  // Template
        cy.get(':nth-child(2) > table > tbody > :nth-child(5) > :nth-child(2) > .editor-field').type('Pre-Authorized Debit{enter}')  // Payment Option
        cy.get('#account_InvoiceDeliveryMethod_chosen > .chosen-single').type('None{enter}') // Invoice Delivery Method
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

        cy.get('#content > .navbar > .navbar-header > .navbar-brand').should('contain', 'Priority Account')

        // Top navigation tabs
        cy.get('#content > .navbar').should('contain', 'Account')
        cy.get('#content > .navbar').should('contain', 'Addresses')
        cy.get('#content > .navbar').should('contain', 'Numbers')
        cy.get('#content > .navbar').should('contain', 'Invoices')
        cy.get('#content > .navbar').should('contain', 'Payments')
        cy.get('#content > .navbar').should('contain', 'AR History')
        cy.get('#content > .navbar').should('contain', 'Charges')
        cy.get('#content > .navbar').should('contain', 'Subscriptions')
        cy.get('#content > .navbar').should('contain', 'Service Schedules')

        cy.get('#content > :nth-child(4)').should('contain', '330 McCowan Road')
        cy.get('#content > :nth-child(4)').should('contain', 'Scarborough')
        cy.get('#content > :nth-child(4)').should('contain', 'AB')
        cy.get('#content > :nth-child(4)').should('contain', 'M1K 1S6')
        cy.get('#content > :nth-child(4)').should('contain', 'CA')

        cy.get('#content > :nth-child(5)').should('contain', 'contact name1')
        cy.get('#content > :nth-child(5)').should('contain', '6472222222 2')
        cy.get('#content > :nth-child(5)').should('contain', '3333333333')
        cy.get('#content > :nth-child(5)').should('contain', '23456')
        cy.get('#content > :nth-child(5)').should('contain', 'test@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testadmin@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testtech@distributel.ca')
        cy.get('#content > :nth-child(5)').should('contain', 'testLNP@distributel.ca')

        cy.get('#content > :nth-child(6)').should('contain', 'this is special instruction')

        // Search the newly created account in the Accounts List
        cy.get('.nav > :nth-child(1) > .dropdown-toggle').click() //Click on managment
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click() //Click on Accounts

        cy.get('#Accounts_filter > label > .form-control').type('Test Automation Account' + random_number)
        cy.get('.odd > .uc-brk').should('contain', 'Test Automation Account' + random_number) // Validate Account Name
        cy.wait(2000)
        cy.get('.odd > :nth-child(3)').should('contain', 'Carrier') // Validate the type
        cy.get('.odd > :nth-child(4)').should('contain', 'Suppressed') // Validate Status
        cy.get('.odd > :nth-child(5)').should('contain', 'Test Automation Contact') // Validate Contact
        cy.get('.odd > :nth-child(6)').should('contain', 'Test Automation Account Manager') // Validate Rep
        cy.get('.odd > .uc-action-80').should('contain', 'Details') // Validate Details link
        cy.get('.odd > .uc-action-80').should('contain', 'Edit') // Validate Edit Link

    })

})