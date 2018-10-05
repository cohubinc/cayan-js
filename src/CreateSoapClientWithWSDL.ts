import { WSDL } from "./wsdl/wsdl";
import Client from "./Client";

export default async function CreateSoapClientWithWSDL(
  definition: string,
  uri: string
) {
  const promise = new Promise((resolve, reject) => {
    const wsdl = new WSDL(definition, uri, {});
    wsdl.onReady(async () => {
      const client = new Client(wsdl, uri);
      resolve(client);
    });
  });

  return promise;
}
