function CompanyModel() {
    var self = this;

    self.companies = ko.observableArray([
        new Company(1, 'Booz Allen Hamilton', 'www.boozallen.com', 'TODO', '283', 'Greensboro Dr', null, 'McLean', 'Virginia', '22102' ),
        new Company(2, 'SAIC', 'www.saic.com', 'TODO', '1710', 'SAIC Dr', null, 'McLean', 'Virginia', '22102' )
    ]);

   /**
    * Deletes a company
    * @param {Company} A new company to add
    */
    self.addCompany = function(company) {
        self.companies.push(company);
    };

   /**
    * Deletes a company
    * @param {Company} company A reference to the company in companies
    */
    self.deleteCompany = function(company) {
        self.companies.remove( company );
    };

    /**
     * Sends the changes to this company to the database
     * @param {Company} company A reference to the company in companies to be saved
     */
    self.saveCompany = function(company) {
        // TODO
    };

    /**
     * Returns an observable array containing all the companies in this model
     * @return {observableArray} observableArray containing a list of companies
     */
    self.getCompanies = function() {
        return self.companies;
    };
};