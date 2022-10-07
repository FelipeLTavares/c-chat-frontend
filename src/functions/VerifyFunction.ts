export const passWordMatch = (pw1: string, pw2: string): boolean => {
  return (pw1 === pw2)
}

export const emailCheck = (email: string): boolean => {
  const hotmail = /@hotmail.com$/
  const gmail = /@gmail.com$/
  const outlook = /@outlook.com$/
  const yahoo1 = /@yahoo.com.br$/
  const yahoo2 = /@yahoo.com$/

  const isHotmail = hotmail.test(email)
  const isGmail = gmail.test(email)
  const isOutlook = outlook.test(email)
  const isYahoo1 = yahoo1.test(email)
  const isYahoo2 = yahoo2.test(email)

  return isHotmail || isGmail || isOutlook || isYahoo1 || isYahoo2 ? true : false;
}

export const isSomethingBlankCreateForm = (args: string[]): boolean => {
  const isBlank: boolean[] = [];

  args[0] === "" ? (isBlank[0] = true) : (isBlank[0] = false); //name
  args[1] === "" ? (isBlank[1] = true) : (isBlank[1] = false); //Email
  args[2] === "" ? (isBlank[2] = true) : (isBlank[2] = false); //Password
  args[3] === "" ? (isBlank[3] = true) : (isBlank[3] = false); //Check Pw

  if (isBlank[0] || isBlank[1] || isBlank[2] || isBlank[3]) {
    return true
  } else {
    return false
  }
}

export const isSomethingBlankAuthForm = (args: string[]):boolean =>{
  const isBlank: boolean[] = [];

  args[0] === "" ? (isBlank[0] = true) : (isBlank[0] = false); //Email
  args[1] === "" ? (isBlank[1] = true) : (isBlank[1] = false); //Password

  if (isBlank[0] || isBlank[1]) {
    return true
  } else {
    return false
  }
}