import crypto, { PublicKeyInput } from "crypto";
import { RequestBuilder, RequestInfo } from "../../../core/helpers/request-builder";
import { Dictionary } from "../../../core/models";
import { AbstractHttpService } from "../../../core/services/http-service";
import { API_BASE_URL, API_VERSION_1 } from "../config/settings";

interface AuthInfo {
    encryptionKey: string;
    timestamp: number;
}

interface CapitalHttpServiceInitParams {
    apiKey: string;
    identifier: string;
    password: string;
}

interface CapitalAuthSessionInfo {
    cst: string;
    securityToken: string;
}

class CapitalHttpService extends AbstractHttpService {
    private _apiKey: string = "";
    private _identifier: string = "";
    private _password: string = "";

    async init(config: CapitalHttpServiceInitParams): Promise<void> {
        this._apiKey = config.apiKey;
        this._identifier = config.identifier;
        this._password = config.password;

        this.createAuthenticationHeaders()
    }

    async getAuthenticationHeaders(requestInfo: RequestInfo): Promise<Dictionary<string>> {
        return this.createAuthenticationHeaders();
    }

    private async getAuthInfo(): Promise<AuthInfo> {
        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/${API_VERSION_1}/session/encryptionKey`)
            .withHeaders({ "X-CAP-API-KEY": this._apiKey })
            .withoutAuthentication()
            .build();
        const response = await this.get<AuthInfo>(request);
        const data = response.data;
        return { encryptionKey: data.encryptionKey, timestamp: data.timestamp };
    }

    private createEncryptPassword(authInfo: AuthInfo): string {
        // TODO: there is something wrong here.
        try {
            const input = Buffer.from(`${this._password}|${authInfo.timestamp}`);
            const key: PublicKeyInput = { key: authInfo.encryptionKey, format: "pem", type: "pkcs1" };
            const publicKey = crypto.createPublicKey(key);
            const encrypted = crypto.publicEncrypt(publicKey, input);
            return encrypted.toString();
        } catch (e) {
            throw new Error(e);
        }
    }

    private async createSession(password: string, isEncrypted: boolean = false): Promise<CapitalAuthSessionInfo> {
        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/${API_VERSION_1}/session`)
            .withPayload({ identifier: this._identifier, password, encryptedPassword: isEncrypted })
            .withHeaders({ "X-CAP-API-KEY": this._apiKey })
            .withoutAuthentication()
            .build();

        // CST and X-SECURITY-TOKEN (10 minutes after last use)
        // CST is an authorization token, X-SECURITY-TOKEN shows which financial account is used for the trades.
        const response = await this.post<AuthInfo>(request);
        const securityToken = response.headers["x-security-token"];
        const cst = response.headers["cst"];
        return { cst, securityToken };
    }

    private async createAuthenticationHeaders(): Promise<Dictionary<string>> {
        try {
            // const authInfo = await this.getAuthInfo();
            // const encyptedPassword = await this.createEncryptPassword(authInfo);
            const session = await this.createSession(this._password);
            return {
                "X-SECURITY-TOKEN": session.securityToken,
                "CST": session.cst,
                "Content-Type": "application/json; charset=utf-8",
            };
        } catch (error) {
            throw new Error(`Invalid authentication: ${error}`);
        }
    }
}

export default new CapitalHttpService();
