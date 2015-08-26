import History from './History';
const FRAG = 'frag';
let Position = function() {
  let tdHistory = new History();
  let elHistories = []; // an array of histories
  let mainHistories = []; // an array of bodyIndexes
  let bodiesHistories = []; // an array of bodiesIndexes
  let tdNames = {}; // maps tdbody Index to names
  const NAME_PREFIX = 'id_';
  const DEFAULT_NAME = 'main';

  this.getElName = function() {
    let elHistory = elHistories[this.getTdIndex()];
    let idx = elHistory.current();
    return (idx > -1) ? `el${idx}` : FRAG;
  };
  this.getTdIndex = function() {
    return tdHistory.current();
  };
  this.getTdBodyIndices = function() {
    return mainBody[tdHistory.current()];
  };
  this.getTdBodiesIndicies = function() {
    return bodiesHistories[tdHistory.current()];
  };
  this.addEl = function() {
    let elHistory = elHistories[this.getTdIndex()];
    // point cursor to the new element
    elHistory.enter();
    return elHistory.current();
  };
  this.leaveEl = function() {
    let elHistory = elHistories[this.getTdIndex()];
    elHistory.leave();
    return elHistory.current();
  };
  this.addTdBody = function(name) {
    tdHistory.enter();
    let tdCount = tdHistory.current();
    tdNames[NAME_PREFIX + tdCount] = name || DEFAULT_NAME;
    elHistories.push(new History()); // start with no history
    return tdCount;
  };
  this.leaveTdBody = function() {
    let childBodyId = tdHistory.current();
    tdHistory.leave();
    let parentBodyId = tdHistory.current();

    if (bodiesHistories[parentBodyId]) {
      bodiesHistories[parentBodyId].push(childBodyId);
    } else {
      bodiesHistories[parentBodyId] = [childBodyId];
    }
    return parentBodyId();
  };
  this.leaveTdBodies = function() {
    let currentBodiesId = tdHistory.current();
    tdHistory.leave();
    return tdHistory.current();
  };

  return this;
};
export default Position;
