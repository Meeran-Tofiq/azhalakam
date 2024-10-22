import { JwtPayload } from "jsonwebtoken";

export default interface CustomJwtPayload extends JwtPayload {
	userId: string;
}
