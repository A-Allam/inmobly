/**
 * Get channel id
 * @description
 * get the chanel id of given channel
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('GetChannelID', GetChannelID);

  /* @ngInject */
  function GetChannelID($http, API_URL, $log, key) {
    return {
      getData : getData
    };

    function getData(username) {
      var config = {
       params: {
        part : "id",
        forUsername : username,
        key: key
       }
      };

      var url = API_URL + '/channels';
      return $http.get(url, config)
        .then(GetIDServiceSuccess)
        .catch(GetIDServiceFailed);
    }

    function GetIDServiceSuccess(response) {
      return response.data;
    }

    function GetIDServiceFailed(error) {
      $log.log("error", error);
    }
  }
})();
