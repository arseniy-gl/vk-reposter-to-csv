import {useEffect, useState} from "react";
import vkConnect from "@vkontakte/vk-connect";

export function useToken() {
  const [token, setToken] = useState();

  useEffect(() => {
    vkConnect
      .sendPromise("VKWebAppGetAuthToken", {"app_id": 7279968, "scope": "groups"})
      .then(res => {
        setToken(res.access_token)
      })
  });

  return token;
}
