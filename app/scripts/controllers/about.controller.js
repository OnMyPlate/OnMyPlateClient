'use strict';

app.controller('AboutCtrl', ['$http','$scope', function($http, $scope) {

  var svg = d3.select('#about').append('svg')
              .attr("width", 50)
              .attr("height", 50)
              .style('border', '1px solid rgba(0, 0, 0, 0.28)')
              .style('border-radius', '50%');
  var circle = svg.append('circle')
                  .attr('cx', 25).attr('cy', 25)
                  .attr('r', 25)
                  .style('fill', '#E1E9E9');
}]);