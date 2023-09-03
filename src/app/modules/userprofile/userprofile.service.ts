import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

  //User Profile
  const userProfile =async (token : string) =>{
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    return verifiedToken;
  }

  export const UserProfileService = {
    userProfile,
  }