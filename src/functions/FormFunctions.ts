const BlankVerify = (args: string[]): boolean[] => {
  const isBlank: boolean[] = [];

  args[0] === "" ? (isBlank[0] = true) : (isBlank[0] = false); //name
  args[1] === "" ? (isBlank[1] = true) : (isBlank[1] = false); //Email
  args[2] === "" ? (isBlank[2] = true) : (isBlank[2] = false); //Password
  args[3] === "" ? (isBlank[3] = true) : (isBlank[3] = false); //Check Pw

  return isBlank;
}

export default BlankVerify;