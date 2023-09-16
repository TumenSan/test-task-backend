// Модель данных для комментариев

class CommentModel {
  id = 0;
  by = '';
  kids = [];
  text = '';
  parent = 0;
  time = 0;
  type = '';

  constructor(id, by, kids, text, parent, time, type) {
    this.id = id;
    this.by = by;
    this.kids = kids;
    this.text = text;
    this.parent = parent;
    this.time = time;
    this.type = type;
  }

  update(data) {
    this.id = data.id;
    this.by = data.by;
    this.kids = data.kids;
    this.text = data.text;
    this.parent = data.parent;
    this.time = data.time;
    this.type = data.type;
  }
}

module.exports = CommentModel;