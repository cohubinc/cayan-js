import "fetch-everywhere";
export default class Client {
    [key: string]: any;
    wsdl: any;
    streamAllowed: any;
    normalizeNames: any;
    SOAPAction: any;
    httpHeaders: any;
    soapHeaders: any;
    bodyAttributes: any;
    lastMessage: any;
    lastRequest: any;
    lastEndpoint: any;
    httpClient: any;
    lastResponse: any;
    lastResponseHeaders: any;
    lastElapsedTime: any;
    lastRequestHeaders: any;
    constructor(wsdl: any, endpoint?: string, options?: any);
    _initializeOptions(options: any): void;
    _initializeServices(endpoint?: string): void;
    _defineService(service: any, endpoint?: string): any;
    _definePort(port: any, endpoint?: string): any;
    _defineMethod(method: any, location: any): (args: any, callback: any, options: any, extraHeaders: any) => void;
    _invoke(method: any, args: any, location: any, callback: any, options: any, extraHeaders: any): void;
}
