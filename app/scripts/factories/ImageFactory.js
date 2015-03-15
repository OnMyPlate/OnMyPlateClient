'use strict';

app.factory('imageFactory',['$http', 
                            'HerokuUrl',
                            '$q',
                            '$location',
                            'AmazonS3',
                            '$rootScope',
                            function($http, HerokuUrl, $q, $location, AmazonS3, $rootScope) {

  var signKey = function(imageFile, post) {
    $http.get(HerokuUrl + 'amazon/sign_key').success(function(response) {
      var signKeyResponse = response;

      var imageParams = {
        food_image: {
          image_url: AmazonS3 + signKeyResponse.key
        }
      };
      postImageToS3(imageFile, signKeyResponse).then(function(response) {
        upsertImageToAPI(imageParams, post).then(function(response) {
          // response is the image added by the user.
        });
      });
    });
  };

  var postImageToS3 = function(imageFile, signKeyResponse) {

    return $http.post(AmazonS3, formImageData(imageFile, signKeyResponse), {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': '',
      }
    });
  };

  var upsertImageToAPI = function(image_params, post) {
    if(post.post.food_image) {
      return $http.put(HerokuUrl + 'food_images/' + post.post.food_image.id, image_params);
    } else {
      return $http.post(HerokuUrl + 'food_images', image_params);
    }
  };

  var formImageData = function(imageFile, signKeyResponse) {
    var imageData = new FormData();
    imageData.append('key', signKeyResponse.key);
    imageData.append('AWSAccessKeyId', signKeyResponse.access_key);
    imageData.append('policy', signKeyResponse.policy);
    imageData.append('acl', 'public-read');
    imageData.append('signature', signKeyResponse.signature);
    imageData.append('Content-Type', 'image/jpeg');
    imageData.append('file', imageFile);
    return imageData;
  };

  return {
    signKey: signKey
  };  

}]);