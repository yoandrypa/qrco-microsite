import session from "@ebanux/ebanux-utils/sessionStorage";

import { createAxiosInstance } from "@ebanux/ebanux-utils/request";

import { setError } from "../../components/Notification";
import { parseErrorMessage } from "../../libs/exceptions";
import { startWaiting, releaseWaiting } from "../../components/Waiting";

export function microSiteUrl() {
  return window.location.href.replace(/\?.*/, '');
}

export function request({ baseURL, inBackground, throwError, ...options }: any): Promise<any> {
  const axiosInstance = createAxiosInstance(baseURL, false);

  if (inBackground !== true) startWaiting();

  return axiosInstance(options).catch((err: any) => {
    const msg = parseErrorMessage(err);

    console.error(err);

    if (throwError === 'notify') {
      setError(msg);
    } else if (throwError !== false) {
      throw new Error(msg);
    }
  }).finally(() => {
    if (inBackground !== true) releaseWaiting();
  });
}

export function payLynkRequest(options: any): Promise<any> {
  return request({ ...options, baseURL: `${process.env.PAYLINK_BASE_URL}/api/v2.0` });
}

export function qrLynkRequest(options: any): Promise<any> {
  return request({ ...options, baseURL: `${process.env.QRLINK_BASE_URL}/api/v2.0` });
}

export function msRequest(options: any): Promise<any> {
  return request({ ...options, baseURL: `${session.appBaseUrl}/api` });
}