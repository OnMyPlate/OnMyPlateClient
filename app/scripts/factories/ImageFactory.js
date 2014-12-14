'use strict';

app.factory('imageFactory', function($http, ServerUrl, $q, $location) {

  var signKeyResponse;

  var signKey = function(imageFile) {
    return $http.get(ServerUrl + 'amazon/sign_key').success(function(response) {
      signKeyResponse = response;

      var image_params = {
        food_image: {
          image_url: 'https://ompimages.s3.amazonaws.com/'+ signKeyResponse.key
        }
      };

      $q.all(postImageToAPI(image_params)).then(function() {
        postImageToS3(imageFile, signKeyResponse);
      });
    });
  };

  var postImageToS3 = function(imageFile, signKeyResponse) {

    var imageData = new FormData();
    imageData.append('key', signKeyResponse.key);
    imageData.append('AWSAccessKeyId', signKeyResponse.access_key);
    imageData.append('policy', signKeyResponse.policy);
    imageData.append('acl', 'public-read');
    imageData.append('signature', signKeyResponse.signature);
    imageData.append('Content-Type', 'image/jpeg');
    imageData.append('file', imageFile);

    $http.post('https://ompimages.s3.amazonaws.com/', imageData, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': '',
      }
    }).success(function(response) {
      console.log('eureka!');
    }).error(function(){
      console.log('fuck you');
    });

  };

  var postImageToAPI = function(image_params) {
    var promises = [];
    promises.push($http.post(ServerUrl + 'food_images', image_params));
  };

  return {
    signKey: signKey
  };  

});