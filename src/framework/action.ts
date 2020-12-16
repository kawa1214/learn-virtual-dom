interface actionInterface {
  actionType: String,
  state: String
}
export const setState = (action: actionInterface) => {
  console.log(action)
  switch(action.actionType) {
    case 'todoInputTextChange':
      
  }
}