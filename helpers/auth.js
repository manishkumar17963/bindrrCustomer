import Cookies from 'cookies'

const Auth = async function ({ req, res }) {
  const cookies = new Cookies(req, res)
  const token = cookies.get('next-auth.session-token')
  console.log('token', token)
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Auth
