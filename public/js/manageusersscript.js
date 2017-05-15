function UserModel() {
    var self = this;

    self.users = ko.observableArray([
        new User(1, 'brianalbin3@gmail.com', '123456', '6793', 'Old Waterloo Road', 'Elkridge', 'Maryland', '21075', true, true ),
        new User(2, 'lucidrain929@gmail.com', '123456', '6793', 'Old Waterloo Road', 'Elkridge', 'Maryland', '21075', false, false )
    ]);

   /**
    * Deletes a user
    * @param {User}
    */
    self.addUser = function(user) {
        self.users.push(user);
    };

   /**
    * Deletes a user
    * @param {User} user A reference to the user in users
    */
    self.deleteUser = function(user) {
        self.users.remove( user );
    };

    /**
     * Sends the changes to this user to the database
     * @param {User} user A reference to the user in users
     */
    self.saveUser = function(user) {
        // TODO
    };
};

var userModel = new UserModel();

function UserListViewModel(userModel) {
    var self = this;

    self.userModel = userModel;

    self.addingUser = ko.observable(false);
    self.newUser = ko.observable( new User() );

    self.confirmDeleteMenuOpen = ko.observable(false);
    self.selectedUserToDelete = ko.observable();

    self.confirmEditMenuOpen = ko.observable(false);
    self.selectedUserToEditOldValues;
    self.selectedUserToEdit = ko.observable(null);

    self.availableStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Masachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma','Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

   /**
    * Add a user
    */
    self.addUser = function() {
        self.userModel.addUser(ko.utils.unwrapObservable(self.newUser()));

        self.newUser( new User() );

        self.addingUser(false);
    };

// TODO: Consider renaming two below functions

   /**
    * Sets addingUser to true
    */
    self.setAddingUser = function() {
        self.addingUser(true);
    };

   /**
    * Sets addingUser to false
    */
    self.unsetAddingUser = function() {
        self.addingUser(false);
    };

   /**
    * Called when the user presses the delete user button.
    * Closes the menu and deletes the selected user.
    * @param {User} user The user to potentially delete
    */
    self.deleteUserButtonPressed = function(user) {
        self.selectedUserToEdit(null);

        self.selectedUserToDelete(user);
        self.confirmDeleteMenuOpen(true);
    }

   /**
    * Called when the user presses the cancel button on the confirm delete user menu.
    * Closes the confirm delete user menu
    */
    self.cancelDeleteSelectedUserButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.selectedUserToDelete(null);
    };

   /**
    * Called when the user presses the confirm button on the confirm delete user menu.
    * Closes the menu and deletes the selected user.
    */
    self.confirmDeleteSelectedUserButtonPressed = function() {
        self.confirmDeleteMenuOpen(false);
        self.userModel.deleteUser( ko.utils.unwrapObservable(self.selectedUserToDelete()) );
        self.selectedUserToDelete(null);
    };

   /**
    * Returns the appropriate class name for the delete button
    * @param {user} user The user for this delete button
    * @return {String} classname the delete button should be
    */
    self.getDeleteButtonClass = function(user) {
        return ko.computed(function() {
            return (self.selectedUserToDelete() == user) ? "delete-item-btn-active" : "delete-item-btn";
        });
    };

   /**
    * Called when the edit user button is pressed.
    * Lets the user edit this user's values, or opens confirm save menu if this user is already being edited
    * @param {User} user The user to edit
    */
    self.editUserButtonPressed = function(user) {
        self.selectedUserToDelete(null);

        if ( self.selectedUserToEdit() == null ) {

            self.selectedUserToEditOldValues = new User();
            self.selectedUserToEditOldValues.copy(user);

            self.selectedUserToEdit(user);
        }
        else if ( self.selectedUserToEdit() == user && ko.utils.unwrapObservable(self.selectedUserToEdit).equals(self.selectedUserToEditOldValues) === false ) {
            self.confirmEditMenuOpen(true);
        }
        else if ( self.selectedUserToEdit() == user && ko.utils.unwrapObservable(self.selectedUserToEdit).equals(self.selectedUserToEditOldValues) === true ) {
            self.selectedUserToEditOldValues = null;
            self.selectedUserToEdit(null);
        }
        else if ( self.selectedUserToEdit() != user )
        {
            // TODO: What do I want it to do? Maybe nothing?
        }
    };

   /**
    * Closes the confirm edit changes menu and saves the user's new values
    */
    self.confirmEditSelectedUserButtonPressed = function() {
        self.userModel.saveUser( ko.utils.unwrapObservable(self.selectedUserToEdit()) );

        self.selectedUserToEditOldValues = null;
        self.selectedUserToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Closes the confirm edit changes menu and resets user's values to what they were before
    */
    self.cancelEditSelectedUserButtonPressed = function() {
        ko.utils.unwrapObservable(self.selectedUserToEdit).copy(self.selectedUserToEditOldValues);

        self.selectedUserToEditOldValues = null;
        self.selectedUserToEdit(null);
        self.confirmEditMenuOpen(false);
    };

   /**
    * Returns the appropriate class name for the edit button
    * @param {User} user The user for this edit button
    * @return {String} classname the edit button should be
    */
    self.getEditButtonClass = function(user) {
        return ko.computed(function() {
            return (self.selectedUserToEdit() == user) ? "edit-item-btn-active" : "edit-item-btn";
        });
    };

};

ko.applyBindings(new UserListViewModel(userModel));