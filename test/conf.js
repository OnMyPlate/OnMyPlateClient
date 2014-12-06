exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['register-spec.js'],
  baseUrl: 'http://localhost:9000/'
};