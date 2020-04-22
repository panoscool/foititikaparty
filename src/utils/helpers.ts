export const objectToArray = (object: object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign({}, e[1], { id: e[0] }))
  }
}

export const clearUndefined = (obj: any) => {
  return Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
}

export const createNewEvent = (user: any, event: any) => {
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || '/assets/images/user.png',
    created: new Date(),
    attendees: {
      [user.uid]: {
        host: true,
        going: true,
        joinDate: new Date(),
        displayName: user.displayName,
        photoURL: user.photoURL || '/assets/images/user.png'
      }
    }
  }
}
