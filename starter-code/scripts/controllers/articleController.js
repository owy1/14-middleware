'use strict';

(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else{
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // DONE:  findWhere method in article.js lets you grab a subset
  // of articles by some field/value combo you pass in ex. load
  // all the articles by their id from createTable
  // the next() method holds a reference to the next action
  // to perform and is called once loadById is done
  // it is naming convention used when passing callbacks in
  // sequential executio of actions
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // DONE: similar to loadByID except load all the articles by
  // the selected author then call next() to perform next operation
  articleController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // DONE: similar to loadByID except load all the articles by
  // the selected category then call next() to perform next operation
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // DONE: assign ctx.articles to Article.allArticles, which is an array of
  // article objects each object contains title, category, author, url, etc.
  // if the Article.allArticles is empty array then load ctx.articles from
  // Articles.fetchAll which either load from webDB or from the json file
  // in data folder 
  articleController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.allArticles;
      next();
    };

    if (Article.allArticles.length) {
      ctx.articles = Article.allArticles;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(window);
