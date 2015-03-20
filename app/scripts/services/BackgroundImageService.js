'use strict';

app.service('backgroundImageService', [function(){
  return function(pageName) {
    switch(pageName) {
      case 'about':
        $('body').removeClass('bg-login');
        $('body').removeClass('bg-reg');
        $('body').addClass('bg-about');
        break;
      case 'login':
        $('body').removeClass('bg-about');
        $('body').removeClass('bg-reg');
        $('body').addClass('bg-login');
        break;
      case 'register':
        $('body').removeClass('bg-login');
        $('body').removeClass('bg-about');
        $('body').addClass('bg-reg');
        break;
      case 'removeAll':
        $('body').removeClass('bg-login');
        $('body').removeClass('bg-reg');
        $('body').removeClass('bg-about');
        break;
    };
  };
}])