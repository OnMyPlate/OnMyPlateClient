describe('OnMyPlate', function() {

  describe('registeration page', function() {

    beforeEach(function() {
      browser.get('http://localhost:9000/#/register');
    });

    it('should register the user wiht appropriate inputs', function() {

      element(by.model('user.username')).sendKeys('realcritic');
      element(by.model('user.email')).sendKeys('realcritic@example.com');
      element(by.model('user.password')).sendKeys('test123');
      element(by.model('user.password_confirmation')).sendKeys('test123');

      element(by.css('.btn.btn-default.register')).click();
    });
  });
});