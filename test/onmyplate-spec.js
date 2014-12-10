describe('OnMyPlate', function() {

  beforeEach(function() {
    var ptor;
  });

  describe('registeration page', function() {

    beforeEach(function() {
      ptor = protractor.getInstance();
      ptor.get('#/register');
    });

    it('should register the user wiht appropriate inputs', function() {

      element(by.model('user.username')).sendKeys('realcritic');
      element(by.model('user.email')).sendKeys('realcritic@example.com');
      element(by.model('user.password')).sendKeys('test123');
      element(by.model('user.password_confirmation')).sendKeys('test123');

      element(by.css('.btn.btn-default.register')).click();

    });


  });

  // describe('login page', function() {

  //   beforeEach(function() {
  //     ptor = protractor.getInstance();
  //     ptor.get('#/login');
  //   });


  //   it('should login wiht proper parameters', function() {

  //     element(by.model('params.email')).sendKeys('realcritic@example.com');
  //     element(by.model('params.password')).sendKeys('test123');

  //     element(by.css('.btn.btn-default.login')).click();
  //   });
  // });

  // ddescribe('post add page', function() {

  //   beforeEach(function() {
  //     ptor = protractor.getInstance();
  //     ptor.get('#/add');
  //   });

  //   it('should add a post' ,function() {

      
      
  //   });
  // });


});