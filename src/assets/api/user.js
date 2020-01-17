import axios from "axios";

export async function login(data) {
  try {
    const result = await axios.post("/user/login",data);
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}

export async function reguser(data) {
  try {
    const result = await axios.post("/user/reguser",data);
    return result.data;
  } catch (err) {
    console.log(err);
    console.log("请求出错了");
  }
}
