import KuberConfig from "./KuberConfig";
import https from 'https';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import fs from 'fs';

export default class KuberClient extends KuberConfig {

    private fileReaderCallback(err: NodeJS.ErrnoException, data: string) {
        if (err) {
            console.error(err);
            return undefined;
        }
        return data;
    }

    private getCertFile = () => fs.readFileSync(this.getCertPath());
    private getTokenFile = () => fs.readFileSync(this.getTokenPath());
    private getAxiosConfig(): AxiosRequestConfig {
        return {
            httpsAgent: new https.Agent({
                ca: this.getCertFile(),
                keepAlive: false
            }),
            headers: {
                Authorization: `Bearer ${this.getTokenFile()}`
            }
        }
    }

    public callApi(callBack: (data: AxiosResponse) => void) {
        axios.get(this.getApiRoute(), this.getAxiosConfig())
            .then(res => {
                callBack(res.data);
            })
            .catch(err => {
                console.log("ERROR HERE")
                console.error(err);
            })
    }

    public createPod(callBack: (data: AxiosResponse) => void) {
        // POST /api/v1/namespaces/test/pods
        // Content-Type: application/vnd.kubernetes.protobuf
        // Accept: application/json
        // try this with JSON or YAML -> https://kubernetes.io/docs/reference/using-api/api-concepts/
    }
}