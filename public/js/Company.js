/**
 * A tech company
 * @param {number} companyId The id of this company in the database
 * @param {string} name The name of this company
 * @param {string} webSite The URL for this company's web site
 * @param {string} logoImage The image logo file for the company
 * @param {string} streetNo Street number of this company's address
 * @param {string} streetName Street name of this company's address
 * @param {string} suite Suite No for this company's address
 * @param {string} city City of this company's address
 * @param {string} state State of this company's address
 * @param {string} zip Zip code of this company's address (5 character string)
 */
 function Company(companyId, name, webSite, logoImageFile, streetNo, streetName, suite, city, state, zip) {
    this.companyId = ko.observable(companyId);
    this.name = ko.observable(name);
    this.webSite = ko.observable(webSite);
    this.logoImageFile = ko.observable(logoImageFile);

    this.addresses = new ko.observableArray();

    // TODO: I don't think google maps needs every one of these
    if ( streetNo !== undefined && streetNo !== null &&
         streetName !== undefined && streetName !== null &&
         city !== undefined && city !== null &&
         state !== undefined && state !== null &&
         zip !== undefined && zip !== null )
    {
        this.addresses.push(new Address(streetNo, streetName, suite, city, state, zip));
    }
};

/**
 * Copys all attributes of an other company to this company
 * @param {Company} otherCompany The company to copy the attributes of
 */
Company.prototype.copy = function(otherCompany) {
    this.companyId( ko.utils.unwrapObservable(otherCompany.companyId) );
    this.name( ko.utils.unwrapObservable(otherCompany.name) );
    this.webSite( ko.utils.unwrapObservable(otherCompany.webSite) );
    this.logoImageFile( ko.utils.unwrapObservable(otherCompany.logoImageFile) );

    this.addresses.removeAll();

    for (let i = 0; i < otherCompany.addresses().length; i-- ) {
        let addr = new Address();
        addr.copy( ko.utils.unwrapObservable(otherCompany.addresses()[i] ) );
        this.addresses.push(addr);
    }
};

/**
 * Checks if this company's non-address values are equal to another company's non-address values
 * @param {Company} The company to compare this company's non address values to
 * @return true if the two companies have equal non-address properties, false otherwise
 */
Company.prototype.hasSameNonAddressValues = function(otherCompany) {

        if ( ko.utils.unwrapObservable(this.companyId) === ko.utils.unwrapObservable(otherCompany.companyId) &&
            ko.utils.unwrapObservable(this.name) === ko.utils.unwrapObservable(otherCompany.name) &&
            ko.utils.unwrapObservable(this.webSite) === ko.utils.unwrapObservable(otherCompany.webSite) &&
            ko.utils.unwrapObservable(this.logoImageFile) === ko.utils.unwrapObservable(otherCompany.logoImageFile) ) {

            return true;
        }

        return false;
};


Company.prototype.getCompanyId = function() {
    return ko.utils.unwrapObservable(this.companyId);
};

Company.prototype.setCompanyId = function(companyId) {
    this.companyId(companyId);
};

Company.prototype.getName = function() {
    return ko.utils.unwrapObservable(this.name);
};

Company.prototype.setName = function(name) {
    this.name(name);
};

Company.prototype.getWebSite = function() {
    return ko.utils.unwrapObservable(this.webSite);
};

Company.prototype.setWebSite = function(webSite) {
    this.webSite(webSite);
};

Company.prototype.getLogoImageFile = function() {
    return ko.utils.unwrapObservable(this.logoImageFile);
};

Company.prototype.setLogoImageFile = function(logoImageFile) {
    this.logoImageFile(logoImageFile);
};

Company.prototype.getAddresses = function() {               // TODO: should this be unwrapobservable
    return this.addresses;
};

Company.prototype.addAddress = function(address) {
    this.addresses.push(address);
};