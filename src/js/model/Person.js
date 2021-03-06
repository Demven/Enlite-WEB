import m from 'mithril';

function Person(data) {
  this.id = m.prop(data.id || '');
  this.name = m.prop(data.name || '');
  this.image = m.prop(data.image || '');
  this.text = m.prop(data.text || '');
  this.chosen = m.prop(data.chosen || false);
}

export default Person;
