describe('demo test', function () {

  beforeEach(function () {
    driver.get('/');
  });

  it('check title', function (done) {
    driver.getTitle().then(function (title) {
      expect(title).toBe('Hello Mokit');
      done();
    });
  });

});