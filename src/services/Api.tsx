import { config } from "../config";
import { ApiConfig } from "../interfaces";

export class Api {
    private config: any;

    constructor() {
        this.config = config;
    }

    private apiConfig: ApiConfig = {
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *omit
        headers: {
            "user-agent": "Mozilla/4.0 MDN Example",
            "content-type": "application/json"
        },
        mode: "cors", // no-cors, *same-origin
        redirect: "follow", // *manual, error
        referrer: "no-referrer", // *client
    };

    public post(
        url: string,
        data: object,
        token: string | boolean = false
    ): any {
        const config = {
            method: "POST",
            body: JSON.stringify(data)
        };

        if(token) {
            this.apiConfig.headers = {
                Authorization: `Bearer ${token}`,
                ...this.apiConfig.headers
            };
        }

        return this.send(url, {
            ...config,
            ...this.apiConfig
        });
    }

    public get(
        url: string,
        token: string | boolean = false,
        download: boolean = false
    ): any {
        const config = {
            method: "GET",
        };

        if(token) {
            this.apiConfig.headers = {
                Authorization: `Bearer ${token}`,
                ...this.config.headers
            };
        }

        if(download) {
            this.apiConfig.headers["content-type"] = "text/plain";
            return this.sendDownload(url, {
                ...config,
                ...this.apiConfig
            });
        } else {
            return this.send(url, {
                ...config,
                ...this.apiConfig
            });
        }
    }

    public send(
        url: string,
        config: object
    ): any {
        const qualifiedUrl = this.config.apiUrl + url;
        return fetch(qualifiedUrl, config)
            .catch(err => {
                console.log("Error: ", err);
            })
            .then(response => response.json());
    }

    public sendDownload(
      url: string,
      config: object
    ): any {
        const qualifiedUrl = this.config.apiUrl + url;
        return fetch(qualifiedUrl, config)
          .catch(err => {
              console.log("Error: ", err);
          })
          .then(response => response);
    }
}