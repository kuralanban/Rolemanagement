export default interface userDetails {
  _id:string,
  userPhoto: string,
  userName: string,
  userEmail: string,
  userPassword: string,
  userRole:string,
  isActive:boolean
}

export default interface Token {
  email: string,
  role:string,
  userName:string
}
