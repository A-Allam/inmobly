/**
* VideosController controller
* @description
* tie modal with the view.
*/

(function () {
  'use strict';

  angular
    .module('app')
    .controller('VideosController', VideosController);

  /* @ngInject */
  function VideosController(GetVideosService, key, $sce, VideoStatisticsService, $filter, download, GetChannelID) {
    var vm = this;
    vm.setUrl = setUrl;
    vm.videoID = "";
    vm.selectedVideo = "";
    vm.selectedVideoIndex = 0;
    vm.downloadImage = downloadImage;
    vm.GetID = GetID;

    // initial the id with specific channel
    vm.id = "UC_Ds7nedV3NqYf0zhpYti4A";

    activate();

    function activate() {
      GetVideosService.getData(vm.id).then(function (data) {
        vm.list = data.items;

        for (let i = vm.list.length - 1; i >= 0; i--) {
          let currentItem = vm.list[i];

          VideoStatisticsService.getData(vm.list[i].id.videoId).then(function(data){
            currentItem.statistics = data.items[0].statistics;
            currentItem.contentDetails = data.items[0].contentDetails;
            currentItem.contentDetails.duration = moment.duration(data.items[0].contentDetails.duration).asMilliseconds();
            vm.list[i] = currentItem;
          });
        }
      });
    }

    function setUrl(index){
      vm.selectedVideo = vm.list[index];
      vm.selectedVideoIndex = index;
      vm.videoID = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+ vm.selectedVideo.id.videoId);
    }

    function downloadImage(imgUrl) {
      download.fromDataURL(imgUrl, "download.png");
    }

    function GetID(){
      var url = vm.channelLink;
      var username = url.substring(url.lastIndexOf('/') + 1);

      GetChannelID.getData(username).then(function(data){
        vm.id = data.items[0].id;
        activate();
      })
    }
  }
})();
