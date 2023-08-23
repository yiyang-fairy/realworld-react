import { request } from "../request";

export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/articles",
    params,
  });
};
export const getArticleFeed = (parmas) => {
  return request({
    method: "GET",
    url: "/articles/feed",
    parmas,
  });
};
export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/articles/${slug}`,
  });
};

export const createArticle = (article) => {
  return request({
    method: "POST",
    url: "/articles",
    data: { article },
  });
};

export const deleteArticle = (slug) => {
    return request({
        method:'DELETE',
        url:`/articles/${slug}`
    })
}

export const favoriteArticle = (slug) => {
  return request({
    method: "POST",
    url: `/articles/${slug}/favorite`,
  });
};
export const unfavoriteArticle = (slug) => {
  return request({
    method: "DELETE",
    url: `/articles/${slug}/favorite`,
  });
};

export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `/articles/${slug}/comments`,
  });
};

export const createComments = (slug, comment) => {
  return request({
    method: "POST",
    url: `/articles/${slug}/comments`,
    data: { comment },
  });
};
export const deleteComments = (slug, id) => {
  return request({
    method: "DELETE",
    url: `/articles/${slug}/comments/${id}`,
  });
};
export const getTags = () => {
  return request({
    method: "GET",
    url: "/tags",
  });
};
