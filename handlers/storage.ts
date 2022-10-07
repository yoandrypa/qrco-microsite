import { CustomError } from "../utils";
import queries from "../queries";

export const upload = async (assets: File[], path = "") => {
  try {
    let files: any[] = [];
    for (const asset of assets) {
      // @ts-ignore
      const res = await queries.storage.upload(asset, path);
      files.push(res);
    }
    return files;
  } catch (e) {
    throw new CustomError("Error uploading files", 500, e);
  }
};

export const download = async (key: string) => {
  try {
    const data = queries.storage.download(key);
    return await data.then((response) => {
      // @ts-ignore
      const reader = response.Body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();

          function pump() {
            // @ts-ignore
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      });
    })
      // Create a new response out of the stream
      .then((stream) => new Response(stream))
      // Create an object URL for the response
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .catch((err) => console.error(err));
  } catch (e) {
    throw new CustomError("Error downloading file", 500, e);
  }
};
