import {useEffect, useMemo, useState} from "react";
import vkConnect from "@vkontakte/vk-connect";

const pattern = /wall(-?\d+)_(\d+)$/gm;

function utf8_to_b64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function useCsvReporters(access_token?: string) {
  const [reposts, setReposts] = useState(),
    [csv, setCSV] = useState();

  const load = useMemo(() => async (link?: string) => {
    if (link && access_token) {
      const match = Array.from(link.matchAll(pattern))[0];
      const opts = {
        method: "wall.getReposts",
        params: {
          owner_id: match[1],
          post_id: match[2],
          count: 1000,
          "v": "5.103",
          access_token
        }
      };
      const res = await vkConnect.sendPromise('VKWebAppCallAPIMethod', opts);
      setReposts(res.response.profiles);
      let csv = "ID,Last name,First name,Sex, Link\n";
      for (let p of res.response.profiles) {
        csv += `${p.id},${p.last_name},${p.first_name},${p.sex === 1?'female':'man'},https://vk.com/id${p.id}\n`
      }
      setCSV(csv)

    }
  }, [access_token]);

  useEffect(() => {
    if (csv) {
      const a = document.createElement('a');
      a.href = 'data:plain/text;base64,'+utf8_to_b64(csv);
      a.download = 'reposts.csv';
      a.click();
    }
  }, [csv]);


  return {reposts, load, csv}
}
