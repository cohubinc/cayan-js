"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var utils_1 = require("./wsdl/utils");
var _ = __importStar(require("lodash"));
require("fetch-everywhere");
var bluebird_1 = __importDefault(require("bluebird"));
var nonIdentifierChars = /[^a-z$_0-9]/i;
var Client = /** @class */ (function () {
    function Client(wsdl, endpoint, options) {
        options = options || {};
        this.wsdl = wsdl;
        this._initializeOptions(options);
        this._initializeServices(endpoint);
        bluebird_1.default.promisifyAll(this, { multiArgs: true });
    }
    Client.prototype._initializeOptions = function (options) {
        this.streamAllowed = options.stream;
        this.normalizeNames = options.normalizeNames;
        this.wsdl.options.attributesKey = options.attributesKey || "attributes";
        this.wsdl.options.envelopeKey = options.envelopeKey || "soap";
        this.wsdl.options.preserveWhitespace = !!options.preserveWhitespace;
        if (options.ignoredNamespaces !== undefined) {
            if (options.ignoredNamespaces.override !== undefined) {
                if (options.ignoredNamespaces.override === true) {
                    if (options.ignoredNamespaces.namespaces !== undefined) {
                        this.wsdl.options.ignoredNamespaces =
                            options.ignoredNamespaces.namespaces;
                    }
                }
            }
        }
        if (options.overrideRootElement !== undefined) {
            this.wsdl.options.overrideRootElement = options.overrideRootElement;
        }
        this.wsdl.options.forceSoap12Headers = !!options.forceSoap12Headers;
    };
    Client.prototype._initializeServices = function (endpoint) {
        var definitions = this.wsdl.definitions;
        var services = definitions.services;
        for (var name in services) {
            this[name] = this._defineService(services[name], endpoint);
        }
    };
    Client.prototype._defineService = function (service, endpoint) {
        var ports = service.ports;
        var def = {};
        for (var name in ports) {
            def[name] = this._definePort(ports[name], endpoint ? endpoint : ports[name].location);
        }
        return def;
    };
    Client.prototype._definePort = function (port, endpoint) {
        var location = endpoint;
        var binding = port.binding;
        var methods = binding.methods;
        var def = {};
        for (var name in methods) {
            def[name] = this._defineMethod(methods[name], location);
            var methodName = this.normalizeNames
                ? name.replace(nonIdentifierChars, "_")
                : name;
            this[methodName] = def[name];
        }
        return def;
    };
    Client.prototype._defineMethod = function (method, location) {
        var self = this;
        var temp;
        return function (args, callback, options, extraHeaders) {
            if (typeof args === "function") {
                callback = args;
                args = {};
            }
            else if (typeof options === "function") {
                temp = callback;
                callback = options;
                options = temp;
            }
            else if (typeof extraHeaders === "function") {
                temp = callback;
                callback = extraHeaders;
                extraHeaders = options;
                options = temp;
            }
            self._invoke(method, args, location, function (error, result, rawResponse, soapHeader, rawRequest) {
                callback(error, result, rawResponse, soapHeader, rawRequest);
            }, options, extraHeaders);
        };
    };
    Client.prototype._invoke = function (method, args, location, callback, options, extraHeaders) {
        var _this = this;
        var self = this, name = method.$name, input = method.input, output = method.output, style = method.style, defs = this.wsdl.definitions, envelopeKey = this.wsdl.options.envelopeKey, ns = defs.$targetNamespace, encoding = "", message = "", xml = null, req = null, soapAction, alias = utils_1.findPrefix(defs.xmlns, ns), headers = {
            "Content-Type": "text/xml; charset=utf-8"
        }, xmlnsSoap = "xmlns:" + envelopeKey + '="http://schemas.xmlsoap.org/soap/envelope/"';
        if (this.wsdl.options.forceSoap12Headers) {
            headers["Content-Type"] = "application/soap+xml; charset=utf-8";
            xmlnsSoap =
                "xmlns:" + envelopeKey + '="http://www.w3.org/2003/05/soap-envelope"';
        }
        if (this.SOAPAction) {
            soapAction = this.SOAPAction;
        }
        else if (method.soapAction !== undefined && method.soapAction !== null) {
            soapAction = method.soapAction;
        }
        else {
            soapAction =
                (ns.lastIndexOf("/") !== ns.length - 1 ? ns + "/" : ns) + name;
        }
        if (!this.wsdl.options.forceSoap12Headers) {
            headers.SOAPAction = '"' + soapAction + '"';
        }
        options = options || {};
        //Add extra headers
        for (var header in this.httpHeaders) {
            headers[header] = this.httpHeaders[header];
        }
        for (var attr in extraHeaders) {
            headers[attr] = extraHeaders[attr];
        }
        // Allow the security object to add headers
        // if (self.security && self.security.addHeaders)
        //   self.security.addHeaders(headers);
        // if (self.security && self.security.addOptions)
        //   self.security.addOptions(options);
        if (style === "rpc" &&
            (input.parts || input.name === "element" || args === null)) {
            assert_1.ok(!style || style === "rpc", "invalid message definition for document style binding");
            message = self.wsdl.objectToRpcXML(name, args, alias, ns, input.name !== "element");
            method.inputSoap === "encoded" &&
                (encoding =
                    'soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" ');
        }
        else {
            assert_1.ok(!style || style === "document", "invalid message definition for rpc style binding");
            // pass `input.$lookupType` if `input.$type` could not be found
            message = self.wsdl.objectToDocumentXML(input.$name, args, input.targetNSAlias, input.targetNamespace, input.$type || input.$lookupType);
        }
        xml =
            '<?xml version="1.0" encoding="utf-8"?>' +
                "<" +
                envelopeKey +
                ":Envelope " +
                xmlnsSoap +
                " " +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                encoding +
                this.wsdl.xmlnsInEnvelope +
                ">" +
                (self.soapHeaders
                    ? "<" +
                        envelopeKey +
                        ":Header>" +
                        (self.soapHeaders ? self.soapHeaders.join("\n") : "") +
                        "</" +
                        envelopeKey +
                        ":Header>"
                    : "") +
                "<" +
                envelopeKey +
                ":Body" +
                (self.bodyAttributes ? self.bodyAttributes.join(" ") : "") +
                ">" +
                message +
                "</" +
                envelopeKey +
                ":Body>" +
                "</" +
                envelopeKey +
                ":Envelope>";
        if (options && options.postProcess) {
            xml = options.postProcess(xml);
        }
        self.lastMessage = message;
        self.lastRequest = xml;
        self.lastEndpoint = location;
        var tryJSONparse = function (body) {
            try {
                return JSON.parse(body);
            }
            catch (err) {
                return undefined;
            }
        };
        fetch(location, {
            headers: headers,
            method: "POST",
            body: xml
        })
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.text()];
                    case 1:
                        body = _a.sent();
                        return [2 /*return*/, parseSync(body, response)];
                }
            });
        }); })
            .catch(function () { return new Error("Error communicating with Cayan"); });
        function parseSync(body, response) {
            var obj;
            try {
                obj = self.wsdl.xmlToObject(body);
            }
            catch (error) {
                //  When the output element cannot be looked up in the wsdl and the body is JSON
                //  instead of sending the error, we pass the body in the response.
                if (!output || !output.$lookupTypes) {
                    // debug(
                    //   "Response element is not present. Unable to convert response xml to json."
                    // );
                    //  If the response is JSON then return it as-is.
                    var json = _.isObject(body) ? body : tryJSONparse(body);
                    if (json) {
                        return callback(null, response, json, undefined, xml);
                    }
                }
                error.response = response;
                error.body = body;
                return callback(error, response, body, undefined, xml);
            }
            return finish(obj, body, response);
        }
        function finish(obj, body, response) {
            var result;
            if (!output) {
                // one-way, no output expected
                return callback(null, null, body, obj.Header, xml);
            }
            // If it's not HTML and Soap Body is empty
            if (!obj.html && !obj.Body) {
                return callback(null, obj, body, obj.Header);
            }
            if (typeof obj.Body !== "object") {
                var error = new Error("Cannot parse response");
                // error.response = response;
                // error.body = body;
                return callback(error, obj, body, undefined, xml);
            }
            result = obj.Body[output.$name];
            // RPC/literal response body may contain elements with added suffixes I.E.
            // 'Response', or 'Output', or 'Out'
            // This doesn't necessarily equal the ouput message name. See WSDL 1.1 Section 2.4.5
            if (!result) {
                result =
                    obj.Body[output.$name.replace(/(?:Out(?:put)?|Response)$/, "")];
            }
            if (!result) {
                ["Response", "Out", "Output"].forEach(function (term) {
                    if (obj.Body.hasOwnProperty(name + term)) {
                        return (result = obj.Body[name + term]);
                    }
                });
            }
            callback(null, result, body, obj.Header, xml);
        }
    };
    return Client;
}());
exports.default = Client;
