exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['loginSpec.js'],
  baseUrl: 'http://localhost:9000/'
};