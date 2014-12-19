'use strict';

app.factory('imageFactory',['$http', 'herokuUrl', '$q', '$location', function($http, herokuUrl, $q, $location) {

  var signKeyResponse;

  var signKey = function(imageFile, post) {
    $http.get(herokuUrl + 'amazon/sign_key').success(function(response) {
      signKeyResponse = response;

      var imageParams = {
        food_image: {
          image_url: 'https://ompimages.s3.amazonaws.com/'+ signKeyResponse.key
        }
      };

      $q.all(upsertImageToAPI(imageParams, post)).then(function(response) {
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

  var upsertImageToAPI = function(image_params, post) {
    var promises = [];
    if(post.post.food_image) {
      promises.push($http.put(herokuUrl + 'food_images/' + post.post.food_image.id, image_params));
    } else {
      promises.push($http.post(herokuUrl + 'food_images', image_params));
    }
  };

  return {
    signKey: signKey
  };  

}]);