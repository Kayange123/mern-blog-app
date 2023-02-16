import decode from "jwt-decode";
export const useDecodedToken = (token) => {
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      return true;
    }
    return false;
  }
};
