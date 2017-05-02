function CompanyListViewModel(companyModel) {
    var self = this;

    self.companyModel = companyModel;

    self.addingCompany = ko.observable(false);
    self.newCompany = ko.observable( new Company() );

    self.confirmDeleteMenuOpen = ko.observable(false);
    self.selectedCompanyToDelete = ko.observable(null);

    self.confirmEditMenuOpen = ko.observable(false);
    self.selectedCompanyToEditOldValues;
    self.selectedCompanyToEdit = ko.observable(null);

   /**
    * Add a Company
    */
    self.addCompany = function(company) {
        self.companyModel.addCompany(ko.utils.unwrapObservable(self.newCompany()))
        self.newCompany( new Company() );

        self.addingCompany(false);
    };

// TODO: Consider renaming two below functions

   /**
    * Sets addingCompany to true
    */
    self.setAddingCompany = function() {
        self.addingCompany(true);
    };

   /**
    * Sets addingCompany to false
    */
    self.unsetAddingCompany = function() {
        self.addingCompany(false);
    };

   /**
    * Called when the user presses the delete company button.
    * Closes the menu and deletes the selected company.
    * @param {Company} company The company to potentially delete
    */
    self.deleteCompanyButtonPressed = function(company) {
        self.selectedCompanyToEdit(null);

        self.selectedCompanyToDelete(company);
        self.confirmDeleteMenuOpen(true);
    }

   /**
    * Called when the user presses the cancel button on the confirm delete company menu.
    * Closes the confirm delete company menu
    */
    self.cancelDeleteSelectedCompanyButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.selectedCompanyToDelete(null);
    };

   /**
    * Called when the user presses the confirm button on the confirm delete company menu.
    * Closes the menu and deletes the selected company.
    */
    self.confirmDeleteSelectedCompanyButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.companyModel.deleteCompany( ko.utils.unwrapObservable(self.selectedCompanyToDelete()));
        self.selectedCompanyToDelete(null);
    };

   /**
    * Returns the appropriate class name for the delete button
    * @param {Company} company The company for this delete button
    * @return {String} classname the delete button should be
    */
    self.getDeleteButtonClass = function(company) {
        return ko.computed(function() {
            return (self.selectedCompanyToDelete() == company) ? "delete-item-btn-active" : "delete-item-btn";
        });
    };

   /**
    * Called when the edit company button is pressed.
    * Lets the user edit this companys's values, or opens confirm save menu if this company is already being edited
    * @param {Company} company The company to edit
    */
    self.editCompanyButtonPressed = function(company) {
        self.selectedCompanyToDelete(null);

        if ( self.selectedCompanyToEdit() == null ) {

            self.selectedCompanyToEditOldValues = new Company();
            self.selectedCompanyToEditOldValues.copy(company);

            self.selectedCompanyToEdit(company);
        }
        else if ( self.selectedCompanyToEdit() == company && ko.utils.unwrapObservable(self.selectedCompanyToEdit).hasSameNonAddressValues(self.selectedCompanyToEditOldValues) === false  ) {
            self.confirmEditMenuOpen(true);
        }
        else if ( self.selectedCompanyToEdit() == company && ko.utils.unwrapObservable(self.selectedCompanyToEdit).hasSameNonAddressValues(self.selectedCompanyToEditOldValues) === true ) {
            self.selectedCompanyToEditOldValues = null;
            self.selectedCompanyToEdit(null);
        }
        else if ( self.selectedCompanyToEdit() != company )
        {
            // TODO: What do I want it to do? Maybe nothing?
        }
    };

   /**
    * Closes the confirm edit changes menu and saves the company's new values
    */
    self.confirmEditSelectedCompanyButtonPressed = function() {
        self.companyModel.saveCompany( ko.utils.unwrapObservable(self.selectedCompanyToEdit()) );

        self.selectedCompanyToEditOldValues = null;
        self.selectedCompanyToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Closes the confirm edit changes menu and resets the company's values to what they were before
    */
    self.cancelEditSelectedCompanyButtonPressed = function() {
        ko.utils.unwrapObservable(self.selectedCompanyToEdit).copy(self.selectedCompanyToEditOldValues);

        self.selectedCompanyToEditOldValues = null;
        self.selectedCompanyToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Returns the appropriate class name for the edit button
    * @param {Company} company The company for this edit button
    * @return {String} classname the edit button should be
    */
    self.getEditButtonClass = function(company) {
        return ko.computed(function() {
            return (self.selectedCompanyToEdit() == company) ? "edit-item-btn-active" : "edit-item-btn";
        });
    };
};

var companyModel = new CompanyModel();
ko.applyBindings(new CompanyListViewModel(companyModel));