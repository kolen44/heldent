import { Injectable } from "@nestjs/common"

@Injectable()
export class TokenService {
    async checkByToken(data) {
        if (data.length > 5) {
            return true
        }
    }
}
