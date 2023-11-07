export default interface roleDetails {
count: any;
  _id:string,
  role: string,
  instrumentPermissions:Array<String>
  rolePermissions: { [instrumentName: string]: boolean };
}

export default interface roleForm{
  roleName: string;
  rolePermissions: { [instrumentName: string]: boolean };
}
