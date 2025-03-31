import { get, post } from './request';

export function getHomeList(index) {
    return get(`/api/article/list/${index}/json`, {});
}

export function getQAList(index) {
    return get(`/api/wenda/list/${index}/json`, {});
}

export function getBanner() {
    return get("/api/banner/json", {});
}

export function getNavi() {
    return get("/api/navi/json", {});
}

export function getProjectList(index, cid = 294) {
    return get(`/api/project/list/${index}/json?cid=${cid}`, {});
}

export function getProjectTree() {
    return get("/api/project/tree/json", {});
}