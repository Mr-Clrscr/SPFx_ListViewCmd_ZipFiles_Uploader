declare interface IListViewCmdCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ListViewCmdCommandSetStrings' {
  const strings: IListViewCmdCommandSetStrings;
  export = strings;
}
