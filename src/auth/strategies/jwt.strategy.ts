import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            //jwtFromRequest: ExtractJwt.fromBodyField("acces_token"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(payload: any) {
        return payload
    }
}
