export enum KeyPressed {
  enter = 'enter'
}

const keyPressHandler = (event: any): KeyPressed | void => {
  if (event.key === 'Enter' || event.keyCode === 13) return KeyPressed.enter
  console.log({ eventKey: event.key })

}

export default keyPressHandler
