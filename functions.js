const fetchApi = async (url) => {
    const res = await fetch(url);
    return res.json();
  };
  const fetchApiAxios = async (url, options) => {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Client-ID zGTp71nvCvPifhiG29t3COlWEcRqQt_Lz1c_Twpazs0",
      },
      params: options,
    });
    return res.data;
  };
  const addContent = (holder, content) => holder.append(content);
  
  const render = (arr, holder, create) => {
    holder.innerHTML = "";
    arr.map((el) => addContent(holder, create(el)));
  };
  
  export { fetchApi, addContent, render, fetchApiAxios };