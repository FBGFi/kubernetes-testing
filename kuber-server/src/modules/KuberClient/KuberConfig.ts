// Lets try object factory here... or not
export default class KuberConfig {
    private _serviceAccountPath = "/var/run/secrets/kubernetes.io/serviceaccount";
    private _certFileName = "ca.crt";
    private _tokenName = "token";
    private _protocol = "https";
    private _apiEndpoint = "kubernetes.default.svc/api";
    private _apiVersion = "v1";

    public getCertPath = () => `${this.serviceAccountPath}/${this.certFileName}`;
    public getTokenPath = () => `${this.serviceAccountPath}/${this.tokenName}`
    public getApiRoute = () => `${this.protocol}://${this.apiEndpoint}/${this.apiVersion}`;

    public get apiVersion() {
        return this._apiVersion;
    }
    public set apiVersion(value) {
        this._apiVersion = value;
    }
    public get serviceAccountPath() {
        return this._serviceAccountPath;
    }
    public set serviceAccountPath(value) {
        this._serviceAccountPath = value;
    }
    public get certFileName() {
        return this._certFileName;
    }
    public set certFileName(value) {
        this._certFileName = value;
    }
    public get tokenName() {
        return this._tokenName;
    }
    public set tokenName(value) {
        this._tokenName = value;
    }
    public get protocol() {
        return this._protocol;
    }
    public set protocol(value) {
        this._protocol = value;
    }
    public get apiEndpoint() {
        return this._apiEndpoint;
    }
    public set apiEndpoint(value) {
        this._apiEndpoint = value;
    }
}