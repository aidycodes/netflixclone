import { removeTokenCookie } from "../../lib/cookies";
import { verifyToken } from "../../lib/utils";
import { Magic } from "@magic-sdk/admin";



export default async function logout(req, res) {
  try {
      
      const magicAdmin = new Magic(process.env.MAGIC_SERVER_KEY);
    if (!req.cookies.token)
      return res.status(401).json({ message: "User is not logged in" });
    const token = req.cookies.token;

    const userId = await verifyToken(token);
    removeTokenCookie(res);
    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.log("User's session with Magic already expired");
      console.error("Error occurred while logging out magic user", error);
    }
   
    res.status(200).json({msg:'success'})
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
