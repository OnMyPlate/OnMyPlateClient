describe('OnMyPlate Login Page', function() {
  it('it should login sucessfully', function() {
    browser.get('http://localhost:9000/#/login');
    element(by.model('params.email')).sendKeys('cenky92@gmail.com');
    element(by.model('params.password')).sendKeys('test');
    element(by.css('.btn.btn-default.login')).click();
  });
});