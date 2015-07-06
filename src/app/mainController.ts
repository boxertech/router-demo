/// <reference path="../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('mainController', ['ListingService', function (listingService) {
    var vm = this
    vm.test = "2";
    vm.listings = [];
    console.log('mainController.listingService: ', listingService);
    console.log('getFeaturedListings: ', listingService.getFeaturedListings);
    console.log('getFeaturedListings.results: ', listingService.getFeaturedListings());
    listingService.getFeaturedListings().then(function(listings) {
        console.log("featured listings: ", listings);
        if (listings) {
            vm.listings = listings;
        }
    });

}]);
