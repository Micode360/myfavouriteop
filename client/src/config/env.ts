


export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.REACT_APP_API_BASE_URL as string,
    isProd() {
        return this.NODE_ENV === 'production'
      },
      isDev() {
        return this.NODE_ENV === 'development'
      },
      isTest() {
        return this.NODE_ENV === 'test'
      },
}

export default ENV