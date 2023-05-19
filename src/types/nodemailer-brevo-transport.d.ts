interface TransportConstructorProps {
  apiKey: string
}

declare module 'nodemailer-brevo-transport' {
  export default class Transport {
    constructor(props: TransportConstructorProps)
  }
}
