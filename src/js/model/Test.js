import m from 'mithril';

function Test(data) {
  this.id = m.prop(data.id || 0);
  this.question = m.prop(data.question || '');
  this.answer = m.prop(data.answer || false);
  this.userAnswer = m.prop(data.userAnswer);
}

export default Test;
