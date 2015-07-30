/// <reference path="../../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('MainController', ['ListingService', function (listingService) {
    var vm = this

    vm.primeFeature = {};
    vm.otherFeatured = [];
    vm.sidebarOpen = false;

    //simple featured list.  First item with property featured = true is primeFeatured.
    //                     Next 3 are other featured.  Any others are ignored.
    listingService.getFeaturedListings().then(function(listings) {
        //console.log("featured listings: ", listings);
        if (listings) {
            vm.primeFeature = listings[0];
            vm.otherFeatured.push(listings[1]);
            vm.otherFeatured.push(listings[2]);
            vm.otherFeatured.push(listings[3]);
        }
    });

    listingService.getAllListings().then(function(listings) {
        //console.log("all listings: ", listings);
        if (listings) {
            vm.listings = listings;
        }
    });

}]);
