import { CustomError } from "../utils";
import queries from "../queries";

export const download = async (key: string, isSample?: boolean) => {
  try {
    const data = queries.storage.download(key, isSample);

    let type = "";

    return await data.then((response) => {
      // @ts-ignore
      type = response.ContentType || "";

      // @ts-ignore
      const reader = response.Body.getReader();
      return new ReadableStream({
        start (controller) {
          return pump();

          function pump () {
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
        },
      });
    })
      // Create a new response out of the stream
      .then((stream: BodyInit | null | undefined) => new Response(stream))
      // Create an object URL for the response
      .then((response: { blob: () => any; }) => response.blob()).
      then((blob: {
        slice: (arg0: number, arg1: any,
          arg2: string) => Blob | MediaSource; size: any;
      }) => ({
        content: URL.createObjectURL(blob.slice(0, blob.size, type)),
        type,
      })).
      catch((err: any) => console.error(err));
  } catch (e) {
    throw new CustomError("Error downloading file", 500, e);
  }
};
