// Модель данных для комментариев

class CommentModel {
  id = 0;
  by = '';
  kids = [];
  text = '';
  time = 0;
  type = '';

  constructor(id, descendants, by, kids, score, time, type, url) {
    this.id = id;
    this.descendants = descendants;
    this.by = by;
    this.kids = kids;
    this.text = text;
    this.time = time;
    this.type = type;
  }

  update(data) {
    this.id = data.id;
    this.by = data.by;
    this.kids = data.kids;
    this.text = data.text;
    this.time = data.time;
    this.type = data.type;
  }
}

module.exports = CommentModel;