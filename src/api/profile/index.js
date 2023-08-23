import { request } from "../request";

export const getAuthor = (username) => {
    return request({
        method: 'GET',
        url:`/profiles/${username}`
    })
}

export const followAuthor = (username) => {
    return request({
        method: 'POST',
        url:`/profiles/${username}/follow`
    })
}

export const unFollowAuthor = (username) => {
    return request({
        method: 'DELETE',
        url:`/profiles/${username}/follow`
    })
}