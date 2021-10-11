export interface PostMFAReturn {
  login: boolean;
}
const postMFA = async (MFA: string): Promise<PostMFAReturn> => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ MFA })
  };
  try {
    const fetchResponse = await fetch("/api/mfa", settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

export default postMFA;
