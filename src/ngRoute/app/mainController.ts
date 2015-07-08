/// <reference path="../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('mainController', ['ListingService', function (listingService) {
    var vm = this

    vm.primeFeature = {};
    vm.otherFeatured = [];
    //console.log('mainController.listingService: ', listingService);
    //console.log('getFeaturedListings: ', listingService.getFeaturedListings);
    //console.log('getFeaturedListings.results: ', listingService.getFeaturedListings());
    listingService.getFeaturedListings().then(function(listings) {
        console.log("featured listings: ", listings);
        if (listings) {
            //vm.listings = listings;
            vm.primeFeature = listings[0];
            console.log('prime feature: ', vm.primeFeature);
            vm.otherFeatured.push(listings[1]);
            vm.otherFeatured.push(listings[2]);
            vm.otherFeatured.push(listings[3]);
        }
    });

    listingService.getAllListings().then(function(listings) {
        console.log("all listings: ", listings);
        if (listings) {
            vm.listings = listings;
        }
    });

    vm.toggleSidebar = function() {
        //console.log('$document: ', $document);
        //console.log('document: ', $(document));
        var sidebar = document.querySelector('.sidebar');
        if ($(sidebar).hasClass('open')) {
            $(sidebar).removeClass('open');
        } else {
            $(sidebar).addClass('open');
        }
    };

}]);
