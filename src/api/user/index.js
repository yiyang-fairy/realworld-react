import { request, setLocalToken } from "../request";

export const register = (user) => {
  return request({
    method: "POST",
    url: "/users",
    data: { user },
  });
};

export const login = async (user) => {
  const {
    user: { token },
  } = await request({
    method: "POST",
    url: "/users/login",
    data: { user },
  });
  setLocalToken(token);

  return user;
};

export const updateUser = (user) => {
  return request({
    method: "PUT",
    url: "/user",
    data: { user },
  });
};

export const getUser = () => {
  return request({
    method:'GET',
    url:'/user'
  })
}
