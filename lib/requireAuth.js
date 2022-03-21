import auth from "./auth";
import nookies from "nookies";
const requireAuth = async (ctx) => {
  const cookies = nookies.get(ctx);
  console.log(cookies);
  if (!cookies?.auth) {
    console.log(cookies);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};
export default requireAuth;
