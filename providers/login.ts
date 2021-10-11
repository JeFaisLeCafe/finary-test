export interface PostLoginReturn {
  needMFA: false;
}
const postLogin = async (email: string): Promise<PostLoginReturn> => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  };
  try {
    const fetchResponse = await fetch("/api/login", settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

export default postLogin;
