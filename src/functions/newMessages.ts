interface newMessageInfo {
  userName: string,
  messageText: string,
  messageTime: string
}

const newMessages: newMessageInfo[] = [
  {
    userName: 'Felipe Tavares',
    messageText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin, urna a aliquam sollicitudin`,
    messageTime: '00:00'
  },
  {
    userName: 'Guilherme Lincoln',
    messageText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie sollicitudin nibh, at vulputate erat efficitur nec. Ut fringilla pellentesque nibh in ultricies. Sed aliquet orci risus, et tempor libero cursus vitae.`,
    messageTime: '00:00'
  },
  {
    userName: 'Jirlan Souza',
    messageText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at est venenatis dui tincidunt varius sit amet at purus. Nunc lacinia urna a mi facilisis, sit amet egestas lorem pretium. Quisque bibendum ut ante et suscipit. Cras fringilla purus et dignissim condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
    messageTime: '00:00'
  },
  {
    userName: 'Paulo Santana',
    messageText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    messageTime: '00:00'
  }
]
export default newMessages;