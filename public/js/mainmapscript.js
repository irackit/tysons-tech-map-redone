/**
 * A company that will be represented on the map. A marker will be on the map for this company
 * and when it is selected an info window will display information about the company
 * @param {Company} company The company to be appear on the google map
 */
var CompanyMapLocation = function(company) {
    this.company = company;

    this.marker = null;
    this.infoWindowContent = null;
};

/**
 * Returns the company
 * @return {Company} the company for this company map location
 */
CompanyMapLocation.prototype.getCompany = function() {
    return this.company;
};

/**
 * Returns the map marker for this company map location
 * @return {google.maps.Marker} the map marker for this company map location
 */
CompanyMapLocation.prototype.getMarker = function() {
    return this.marker;
};

/**
 * Sets the map marker for this company
 * @param {google.maps.Marker} marker The map marker to use for this company
 */
CompanyMapLocation.prototype.setMarker = function(marker) {
    this.marker = marker;
};

/**
 * Get the info window content that will appear when this company is set to active
 * @return {string|Node} The HTML content that will appear in the info window when this place is active
 */
CompanyMapLocation.prototype.getInfoWindowContent = function() {
    return this.infoWindowContent;
};

/**
 * Set the info window content that will appear when this company is set to active
 * @param {string|Node} infoWindowContent The HTML content to appear in the info window when this companty is set to active. For example: <h1>Northrop Grumman</h1>
 */
CompanyMapLocation.prototype.setInfoWindowContent = function(infoWindowContent) {
    this.infoWindowContent = infoWindowContent;
};

/**
 * Contains a list of company map locations
 * @param {CompanyModel} companyModel Locations will be derived from the companies contained in this model
 */
var LocationModel = function(companyModel) { // TODO: Not sure if this is how I want to do it
    this.companyModel = companyModel;
    this.locations = [];

    this.companies = this.companyModel.getCompanies();

    for (let i = 0; i < this.companies().length; i++) {
        let company = this.companies()[i];
        let companyName = company.getName();

        this.locations[companyName] = new CompanyMapLocation(company);
    }
};

/**
 * Returns a Location given its name
 * @param {string} name The name of the location
 * @return {Location} A Location object with the given name
 */
LocationModel.prototype.getLocationByName = function(name) {
    return this.locations[name];
};


// TODO: Should I pass in lm as well,
// Also, why do I need companyModel when locationModel has access to everything in companyModel?
var ViewModel = function() { // TODO: rename this
    var self = this;

    self.companyModel = companyModel;

    self.filter = ko.observable('');

    self.currentLocation = ko.observable();


   /**
    * Sets the company as the active location on the map and list and opens an InfoWindow above the selected location
    * @param {Company} The company to set as the active location
    */
    self.setActiveLocation = function(company) {
        let locName = company.getName();

        mainMap.setActiveMarker(locName);
        mainMap.openInfoWindowAtLocation(locName);

        let location = lm.getLocationByName(locName);

        self.currentLocation( location );
    };


   /**
    * Filters the companies in the list depending on if they are in the filter. If a company isn't in the filter,
    * it will be removed from the map and deselected.
    */
    self.filterCompanies = ko.computed(function () {
        if (!self.filter()) {
            if ( mainMap ) { // MAP NOT YET LOADED
                mainMap.setAllMarkersVisible(true);
            }
            return self.companyModel.companies();
        }
        else {
            return ko.utils.arrayFilter(self.companyModel.companies(), function(company) {

                let locName = company.getName();

                let show = locName.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1;

                if ( show === false ) {
                    mainMap.setLocationMarkerInactive(locName);

                    if ( self.currentLocation() && self.currentLocation().getCompany().getName() === locName  ) {
                        self.currentLocation( null );
                        mainMap.hideInfoWindow();
                    }
                }
                mainMap.setLocationMarkerVisible(locName, show);

                return show;
            });
        }
    });

   /**
    * Returns the appropriate class name for the location link
    * @param {Company} The company for this location link
    * @return {string} classname the edit button should be
    */
    self.getLocationListItemClass = function(company) {
        return ko.pureComputed(function() {
            if ( self.currentLocation() && self.currentLocation().getCompany().getName() === company.getName() ) {
                return 'sidebarListSelectedItem'
            }
            return '';
        });
    };
};




// TODO: MARKERS SHOULD ALL BE IN MAP
var Map = function(containerId) {

    this.container = document.getElementById(containerId);
    this.map;
    this.infoWindow = new google.maps.InfoWindow( { content: '' } );

    this._DESELECTED_MARKER_ICON = 'https://www.google.com/mapfiles/marker.png';
    this._SELECTED_MARKER_ICON = 'https://www.google.com/mapfiles/marker_green.png';
};

/**
 * Displays a map with location markers on the screen
 */
Map.prototype.render = function() {
    var mapOptions = {
        disableDefaultUI: true,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#000000'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              "featureType": "poi.park",
              "stylers": [{"visibility": "off"}]
            },
            {
            "featureType": "poi.government",
            "stylers": [{"visibility": "off"}]
            },
            {
            "featureType": "poi.medical",
            "stylers": [{"visibility": "off"}]
            },
            {
              "featureType": "poi.place_of_worship",
              "stylers": [{"visibility": "off"}]
            },
            {
              "featureType": "poi.school",
              "stylers": [{"visibility": "off"}]
            },
            {
              "featureType": "poi.sports_complex",
              "stylers": [{ "visibility": "off" }]
            },
            {
              "featureType": "poi.attraction",
              "stylers": [{"visibility": "off"}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    };

    this.map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    window.mapBounds = new google.maps.LatLngBounds();

    this._addLocationMarkers();
};

/**
 * Resizes the map to use all available space
 */
Map.prototype.resizeMap = function() {
    let center = this.map.getCenter();
    google.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(center);
};

/**
 * Makes all map markers visible or invisible
 * @param {boolean} makeVisible True to make all map markers visible, false to make all map markers invisible
 */
Map.prototype.setAllMarkersVisible = function(makeVisible) {
    for (let key in lm.locations) {
        if ( lm.locations.hasOwnProperty(key) ) {
            lm.locations[key].getMarker().setVisible(makeVisible);
        }
    }
};

/**
 * Shows or hides a location's map marker
 * @param {string} locationName The name of the location
 * @param {boolean} isVisible True to make the location visible, false to make it invisible
 */
Map.prototype.setLocationMarkerVisible = function(locationName, isVisible) {
    let location = lm.getLocationByName(locationName);
    let marker = location.getMarker();

    if ( marker !== null ) {
        marker.setVisible(isVisible);
    }
};

/**
 * Makes the marker at the specified location active and all other markers inactive. (Active markers are green, others are red)
 * @param {string} locationName The name of the location whose marker is to be made active
 */
Map.prototype.setActiveMarker = function(locationName) {
    let location = lm.getLocationByName(locationName);
    let marker = location.getMarker();

    if ( marker !== null ) {
        this._setActiveMarker(marker);
    }
};

/**
 * Opens an infoWindow at the location's map marker
 * @param {string} locationName The name of the location which will have an infoWindow appear at its map marker
 */
Map.prototype.openInfoWindowAtLocation = function(locationName) {
    let location = lm.getLocationByName(locationName);

    if ( location !== null ) {
        this.infoWindow.setContent( location.getInfoWindowContent() );
        this.infoWindow.open(this.map, location.getMarker());
    }
};

/**
 * Makes the marker at the specified location active and all other markers inactive. (Active markers are green, others are red)
 * @param {string} locationName The name of the location whose marker is to be made active
 */
Map.prototype.hideInfoWindow = function() {
    this.infoWindow.close();
};

/**
 * Makes the marker at the specified location inactive (marker will be made red)
 * @param {string} locationName The name of the location whose marker is to be made inactive
 */
Map.prototype.setLocationMarkerInactive = function(locationName) {
    let location = lm.getLocationByName(locationName);
    let marker = location.getMarker();

    marker.setIcon(this._DESELECTED_MARKER_ICON);
};

/**
 * Makes the marker passed in active and all other markers inactive. (Active markers are green, others are red)
 * @param {string} marker The marker to be made active
 */
Map.prototype._setActiveMarker = function(marker) {
    for (let key in lm.locations) {
        if ( lm.locations.hasOwnProperty(key) ) {
            lm.locations[key].getMarker().setIcon(this._DESELECTED_MARKER_ICON);
        }
    }

    marker.setIcon(this._SELECTED_MARKER_ICON);
};

/**
 * Creates a map marker on the map for each location in the location model
 */
Map.prototype._addLocationMarkers = function () { // TODO: THIS IS BAD, SHOULDN'T LOOK IT UP EVERY TIME
    let self = this;

    let service = new google.maps.places.PlacesService(this.map);

    for (let key in lm.locations) {
        if ( lm.locations.hasOwnProperty(key) ) {
            let location = lm.locations[key];

            // TODO: FIX LATER
            let addresses = location.getCompany().getAddresses();
            let firstAddress = addresses()[0];
            let formattedAddress = firstAddress.getFormattedAddress();

            let locationQuery = location.getCompany().getName() + ' ' + formattedAddress;

            let request = {
                query: locationQuery
            };

            (function(loc) {
                service.textSearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        self._createMapMarker(results[0], loc);
                    }
                    else {
                        $('#googleMap').append('<h2>Oh noes! Could not load place data from google maps for ' + location.name +'.</h2>');
                    }
                });
            })(location);
        }
    }
};

/**
 * Creates a map marker from a location and the result of a google place search on the location
 * @param {???} result The result of a google place search on the location
 * @param {Location} location
 */
Map.prototype._createMapMarker = function(result, location) {
    let lat = result.geometry.location.lat(),
        lon = result.geometry.location.lng(),
        //name = result.formatted_address;   // name of the place from the place service
        name = location.name,
        bounds = window.mapBounds;

    let marker = new google.maps.Marker({
      map: this.map,
      position: result.geometry.location,
      title: name,
      icon: this._DESELECTED_MARKER_ICON
    });

    // TODO: FIX LATER
    let addresses = location.getCompany().getAddresses();
    let firstAddress = addresses()[0];
    let formattedAddress = firstAddress.getFormattedAddress();

    let infoWindowContent = '<div>' +
                                '<h1 class="info-window-header">' + location.getCompany().getName() + '</h1>' +
                                '<div>' +
                                    '<img class="info-window-icon" src="img/infoWindowAddressIcon.png">' +
                                    '<span>' + formattedAddress  + '</span>' +
                                '</div>';

    location.setMarker(marker);
    location.setInfoWindowContent(infoWindowContent);

    google.maps.event.addListener(marker, 'click', function() {
        vm.currentLocation( location );
        this._setActiveMarker(marker);  //TODO: Should maybe use a callback

        this.infoWindow.setContent(location.getInfoWindowContent());

        this.infoWindow.open(this.map, marker);
    }.bind(this));

    bounds.extend(new google.maps.LatLng(lat, lon));
    this.map.fitBounds(bounds);
    this.map.setCenter(bounds.getCenter());
};



var mainMap;
var companyModel = new CompanyModel();
var lm = new LocationModel(companyModel);
var vm = new ViewModel(companyModel);

/**
 * Initializes the google map
 */
function initMap() {
    ko.applyBindings( vm );
    mainMap = new Map('googleMap');
    mainMap.render();

    window.onresize = function() {
        mainMap.resizeMap();
        mainMap.map.setCenter(mainMap.map.getCenter());
    };
}

/**
 * Alerts the user that google maps could not be loaded
 */
function googleMapsError() {
    alert('Oh Noes! Could not load google maps.');
}