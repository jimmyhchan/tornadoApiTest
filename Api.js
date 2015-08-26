var History = require('./History');

var Api = function() {
  var tdHistory = new History(),
      elHistory = new History(),
      meta = {},
      entities = {
      };

  function addBodyAndFragment(b, f) {
    var len;
    tdHistory.enter();
    if (entities.bodys) {
      len = entities.fragments.push(f);
      b.fragment = len - 1;
      entities.bodys.push(b);
    } else {
      b.fragment = 0;
      entities.bodys = [b];
      entities.fragments = [f];
    }
  }
  return {
    addBody: function() {
      addBodyAndFragment({mains:[], bodies: []}, {});
      meta.currentBody = tdHistory.current();
    },
    leaveBody: function() {
      var tIndex = tdHistory.current();
      tdHistory.leave();
      var parentIndex = tdHistory.current();
      if (parentIndex >= 0) {
        entities.bodys[parentIndex].mains.push(tIndex);
      }
      meta.currentBody = parentIndex;
    },
    addBodies: function() {
      addBodyAndFragment({mains:[], bodies: []}, {});
      meta.currentBody = tdHistory.current();
    },
    leaveBodies: function() {
      var tIndex = tdHistory.current();
      tdHistory.leave();
      var parentIndex = tdHistory.current();
      if (parentIndex >= 0) {
        entities.bodys[parentIndex].bodies.push(tIndex);
      }
      meta.currentBody = parentIndex;
    },
    meta: meta,
    entities: entities,

    //debugging
    _tdHistory: tdHistory,
    _elHistory: elHistory
  };
};


module.exports = Api;
