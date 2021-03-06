var Api = require('./Api'),
    test = require('tape');

test('initialize with a blank param', function(t) {
  var api = new Api();
  t.plan(2);
  t.equal(api.entities.params, undefined, 'should start with no params');
  api.addBody();
  t.equal(api.entities.bodys[0].params, undefined, 'should start with no params');
});
test('adding an param before adding a body/fragment is a no-no', function(t) {
  var api = new Api();
  t.throws(api.addParam);
  t.end();
});
test('add one param', function(t) {
  var api = new Api();
  api.addBody();
  api.addParam({key:'a', value:'1'});
  t.equal(api.entities.params.length, 1, 'adding a param to the list of params');
  t.deepEqual(api.entities.bodys[0].params, [0], 'connect a param to current body');
  t.end();
});
test('add many params', function(t) {
  var api = new Api();
  api.addBody();
  api.addParam({key:'a', value:'1'});
  api.addParam({key:'b', value:'2'});
  api.addParam({key:'c', value:'3'});

  t.equal(api.entities.params.length, 3, 'adding 3 params');
  t.deepEqual(api.entities.bodys[0].params, [0, 1, 2], 'connect params to current body');
  t.end();
});
