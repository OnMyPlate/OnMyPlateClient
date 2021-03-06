'use strict';

app.factory('imageFactory',['$http', 
                            'HerokuUrl',
                            '$q',
                            '$location',
                            'AmazonS3',
                            '$rootScope',
                            function($http, HerokuUrl, $q, $location, AmazonS3, $rootScope) {

  var getSignKey = function() {
    return $q(function(resolve, reject) {
      $http.get(HerokuUrl + 'amazon/sign_key').success(function(response) {
        resolve(response);
      });
    });
  };

  var formImageParams = function(signKeyResponse) {
    return {
      food_image: {
        image_url: AmazonS3 + signKeyResponse.key
      }
    };
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

  var upsertImageToAPI = function(imageFile, post, imageParams) {
    if(post.post.food_image) {
      return $q(function(resolve, reject) {
        $http.put(HerokuUrl + 'food_images/' + post.post.food_image.id, imageParams).success(function(response) {
          resolve(response);
        }).error(function(data) {
          reject(data);
        });
      });
    } else {
      return $q(function(resolve, reject) {
        $http.post(HerokuUrl + 'food_images', imageParams).success(function(response) {
          resolve(response);
        }).error(function(data) {
          reject(data);
        });
      });
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
    getSignKey: getSignKey,
    postImageToS3: postImageToS3,
    upsertImageToAPI: upsertImageToAPI,
    formImageParams: formImageParams
  };  

}]);