/**
 * Get vedios service
 * @description
 * get all vedios from youtube channel
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('GetVideosService', GetVideosService);

  /* @ngInject */
  function GetVideosService($http, API_URL, $log, key) {
    return {
      getData : getData
    };

    function getData(id) {
      var config = {
       params: {
        channelId : id,
        key: key,
        part:"snippet,id",
        order:"date",
        maxResults:16
       }
      };

      var url = API_URL + '/search';
      return $http.get(url, config)
        .then(GetVideosServiceSuccess)
        .catch(GetVideosServiceFailed);
    }

    function GetVideosServiceSuccess(response) {
      return response.data;
    }

    function GetVideosServiceFailed(error) {
      $log.log("error", error);
    }
  }
})();
