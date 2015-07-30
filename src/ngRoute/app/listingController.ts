/// <reference path="../../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('ListingController', ['ListingService', '$location', function (listingService, $location) {
    var vm = this

    vm.searchTerm = $location.search()['term'];

    vm.listings = [];
    console.log('listingController.searchTerm: ', vm.searchTerm);
    listingService.getSearchListings(vm.searchTerm).then(function(listings) {
        if (listings) {
            vm.listings = listings;
        }
    });

}]);
