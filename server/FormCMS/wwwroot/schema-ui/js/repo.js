const apiPrefix = "/api";
axios.defaults.withCredentials = true

export async function getUserInfo() {
    return await tryFetch(async ()=> await axios.get(apiPrefix + `/me`));
}

export async function logout() {
    return await tryFetch(async () => await axios.get(apiPrefix + `/logout`));
}

export async function list(type){
    return  await tryFetch(async ()=>await  axios.get(apiPrefix + `/schemas?type=${type??''}`))
}

export async function singleByName(name, type){
    const url = `/schemas/name/${name}?type=${type}`;
    return  await tryFetch(async ()=>await  axios.get(apiPrefix + url))
}

export async function getHistory(schemaId){
    return await tryFetch(async ()=> await  axios.get(apiPrefix + `/schemas/history/${schemaId}`))
}

export async function single(id){
    const url = `/schemas/${id}`;
    return  await tryFetch(async ()=>await  axios.get(apiPrefix + url))
}

export async function save(data) {
    return await tryFetch(async ()=>await axios.post(apiPrefix + "/schemas", data))
}

export async function saveDefine(data){
    return await tryFetch(async ()=>await  axios.post(apiPrefix + `/schemas/entity/define`, data))
}

export async function publish(data){
    return await tryFetch(async ()=>await  axios.post(apiPrefix + `/schemas/publish`, data))
}

export async function define(name){
    return await tryFetch(async ()=> await  axios.get(apiPrefix + `/schemas/entity/${name}/define`))
}

export async function del(id){
    return await tryFetch(async ()=> await axios.delete(apiPrefix + `/schemas/${id}`));
}

async function tryFetch(cb){
    try {
        const res = await cb()
        return {data:res.data};
    }catch (err){
        return {error: err.response.data.title??'An error has occurred. Please try again.'}
    }
}