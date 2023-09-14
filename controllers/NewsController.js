const NewsModel = require("../models/NewsModel");

function fetchSingleNews(id) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  )
    .then((response) => response.json())
    .then((data) => {
      if ((data.hasOwnProperty("type")) && (!data.hasOwnProperty("deleted")) && (!data.hasOwnProperty("dead")))
        if (data.type === "story") {
          console.log(data);
          return new NewsModel(
            data.id,
            data.descendants,
            data.by,
            data.kids,
            data.score,
            data.time,
            data.type,
            data.title,
            data.url
          );
        } 
      return (false);
    });
}

function fetch500LastNews() {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`
  ).then((response) => response.json());
}


function fetchSingleComment(id) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty("type"))
        if (data.type === "comment") {
          console.log(data);
          return new NewsModel(
            data.id,
            data.by,
            data.kids,
            data.text,
            data.time,
            data.type
          );
        } 
      return (false);
    });
}


class NewsController {
  // Одна новость
  async GetNews(req, res, next) {
    console.log("GetNews");
    try {
      let News = await fetchSingleNews(req.params.id);
      if (News !== false) res.status(200).send(News);
      else res.status(200).json({ error: "Error GetNews" });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error GetNews" });
    } finally {
      console.log("end GetNews");
    }
  }

  // Последний объект
  async GetMaxItem(req, res, next) {
    console.log("GetMaxItem");
    try {
      let Id = await fetch(`https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty`)
        .then((response) => response.json());
      res.status(200).send({ id: Id });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error GetMaxItem" });
    } finally {
      console.log("end GetMaxItem");
    }
  }

  // Последние сто новости
  async Get100LastNews(req, res, next) {
    console.log("Get100LastNews");
    try {
      let Last500News = await fetch500LastNews();
      const Last100News = Last500News.slice(0, 100);
      res.status(200).send(Last100News);
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error Get100LastNews" });
    } finally {
      console.log("end Get100LastNews");
    }
  }


  // Один комментарии
  async GetComment(req, res, next) {
    console.log("GetComment");
    try {
      let Comment = await fetchSingleComment(req.params.id);
      if (Comment !== false) res.status(200).send(Comment);
      else res.status(200).json({ error: "Error GetComment" });
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: "Error GetComment" });
    } finally {
      console.log("end GetComment");
    }
  }
}

module.exports = new NewsController();
