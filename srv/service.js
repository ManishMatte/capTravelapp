const documentClient = require("./util/documentInformation");

module.exports = function (server) {
  server.on("PostOCR", async function (req, res) {
    const formData = new FormData(),
      {
        data: { document, name },
      } = req;

    if (!document) return 0;
    if (!name) return 0;

    const buffer = _DataURIToBlob(document);

    formData.append("file", buffer, name);
    formData.append(
      "options",
      JSON.stringify({
        schemaId: "f03ffc60-1d71-4023-8f97-baa2555b04b9",
        clientId: "default",
        documentType: "custom",
        templateId:"a6cab4af-b5a1-4d98-bc2d-bbdabd162378",
        receivedDate: new Date().toISOString().split("T")[0],
      })
    );
    try {
      // we will get unique id of the attachment from the document service here
      const response = await documentClient.post("/document/jobs", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      // console.log(response)
      return response.data;
    } catch (err) {
      req.reject(err);
    }
    return 0;
  });

  server.on(["GetOCR", "GetAllOCR"], async function (req) {
    const { event } = req;

    if (event === "GetAllOCR") {
      const { data } = await documentClient.get(`/document/jobs`);
      console.log(data);
      return data?.results?.sort(
        (first, second) =>
          -new Date(first.created).getTime() +
          new Date(second.created).getTime()
      );
    }

    const {
        data: { ID },
      } = req,
      { data } = await documentClient.get(`/document/jobs/${ID}`);

    data.extraction.lineItems = data.extraction.lineItems.map((item, index) => {
      return {
        name: `Line Item ${index + 1}`,
        data: item,
      };
    });
   
    return data;
  });
};

function _DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}
