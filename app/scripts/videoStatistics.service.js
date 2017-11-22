/**
 * VideoStatisticsService
 * @description
 * get all vedio statistics
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('VideoStatisticsService', VideoStatisticsService);

  /* @ngInject */
  function VideoStatisticsService($http, API_URL, $log, key) {
    return {
      getData : getData
    };

    function getData(id) {
      var config = {
       params: {
        id: id,
        key: key,
        part: "statistics, contentDetails"
       }
      };

      var url = API_URL + '/videos';
      return $http.get(url, config)
        .then(VideoStatisticsSuccess)
        .catch(VideoStatisticsFailed);
    }

    function VideoStatisticsSuccess(response) {
      return response.data;
    }

    function VideoStatisticsFailed(error) {
      $log.log("error", error);
    }
  }
})();
