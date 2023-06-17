import React, { useState } from 'react'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => {
    localStorage.setItem(
      'userDetails', {}
    )
  },
  username: '',
})

export const AuthContextProvider = (props) => {

  const storageData = localStorage ? JSON.parse(localStorage.getItem('userDetails')) : {}

  let initialToken, userName, userType, account_type, fullName, donations, regular, exemption, exemptionAmount, regularAmount, registerAmount, regFeeCheck, certificateCheck, checkExempted, regId44
  if (localStorage.getItem('user_access')) {
    initialToken = localStorage.getItem('user_access')
    userName = JSON.parse(
      localStorage.getItem('userDetails') || { userName: '' }
    ).username
    userType = JSON.parse(
      localStorage.getItem('userDetails') || { user_type: '' }
    ).user_type
    account_type = JSON.parse(
      localStorage.getItem('userDetails') || { account_type: '' }
    ).account_type
    fullName = JSON.parse(
      localStorage.getItem('userDetails') || { fullName: '' }
    ).fullName
    donations = JSON.parse(
      localStorage.getItem('userDetails') || { donations: '' }
    ).donations
    regular = JSON.parse(
      localStorage.getItem('userDetails') || { regular: 'true' }
    ).regular
    exemption = JSON.parse(
      localStorage.getItem('userDetails') || { exemption: 'true' }
    ).exemption
    exemptionAmount = JSON.parse(
      localStorage.getItem('userDetails') || { exemptionAmount: '0' }
    ).exemptionAmount
    regularAmount = JSON.parse(
      localStorage.getItem('userDetails') || { regularAmount: '0' }
    ).regularAmount
    registerAmount = JSON.parse(
      localStorage.getItem('userDetails') || { registration_amount: '0' }
    ).registration_amount
    regFeeCheck = JSON.parse(
      localStorage.getItem('userDetails') || { paid_for_registration: false }
    ).paid_for_registration
    certificateCheck = JSON.parse(
      localStorage.getItem('userDetails') || { check_certificate_uploaded: false }
    ).check_certificate_uploaded
    checkExempted = JSON.parse(
      localStorage.getItem('userDetails') || { check_exempted: false }
    ).check_exempted
    //get the item passed and store it in regId, item passed k\in this case reg_id, which is part of whats returned as login response
    regId44 = ''
  }

  const [username, setName] = useState(userName)
  const [usertype, setType] = useState(userType)
  const [accounttype, setAccount] = useState(account_type)
  const [fullname, setFullName] = useState(fullName)
  const [donation, setDonation] = useState(donations)
  const [token, setToken] = useState(initialToken)
  const [registerFeeCheck, setRegisterFeeCheck] = useState(regFeeCheck)
  const [registerAm, setRegisterAm] = useState(registerAmount)
  const [regularfee, setRegularFee] = useState(regular)
  const [exemptionfee, setExemption] = useState(exemption)
  const [regularAm, setRegularAm] = useState(regularAmount)
  const [exemptionAm, setExemptionAm] = useState(exemptionAmount)
  const [certificateUploaded, setCertificateUploaded] = useState(certificateCheck)
  const [exemptedCheck, setExemptedCheck] = useState(checkExempted)
  const [regid, setRegId] = useState(regId44)

  const userIsLoggedIn = !!token

  const setRegisterPaid = (status) => {

    setRegisterFeeCheck(status == true ? true : false)

    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        ...storageData,
        do_reg_id: status == true ? true : false
      })
    )
  }

  const setRegFee = (status) => {
    setRegularFee(status)
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        ...storageData,
        regular: status
      })
    )
  }

  const setExemFee = (status) => {
    setExemption(status)
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        ...storageData,
        exemption: status
      })
    )
  }

  const setCertificate = (status) => {
    setCertificateUploaded(status)
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        ...storageData,
        check_certificate_uploaded: status
      })
    )
  }

  const setRegistrationId = (status) => {
    setRegId(status)
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        ...storageData,
        check_certificate_uploaded: status
      })
    )
  }


  //console.log(regid)


  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('user_access')
    setType(null)
    localStorage.setItem(
      'userDetails',
      JSON.stringify({})
    )
    setName("")
    setAccount("")
    setFullName("")
    setDonation("")
    setRegisterFeeCheck("")
    setRegisterAm("")
    setRegularFee("")
    setExemption("")
    setRegularAm("")
    setExemptionAm("")
    setCertificateUploaded("")
    setExemptedCheck("")
    setRegistrationId("")
  }

  const loginHandler = (token, name, type, don, reg, exem, regAm, exemAm, regisAm, accType, cert, exemChck, regCheck, registrationId) => {
    setToken(token)
    setName(name)
    setType(type)
    setDonation(don)
    setRegularFee(reg)
    setExemption(exem)
    setRegularAm(regAm)
    setRegisterAm(regisAm)
    setExemptionAm(exemAm)
    setAccount(accType)
    setCertificateUploaded(cert)
    setExemptedCheck(exemChck)
    setRegisterPaid(regCheck)
    setRegistrationId(registrationId)
    localStorage.setItem('user_access', token)
  }


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    username: username,
    usertype: usertype,
    accounttype: accounttype,
    fullname: fullname,
    donations: donation,
    regular: regularfee,
    exemption: exemptionfee,
    setRegular: setRegFee,
    setExemption: setExemFee,
    regularAm: regularAm,
    registerFeeCheck: registerFeeCheck,
    registerAm: registerAm,
    setRegisterPaid: setRegisterPaid,
    exemptionAm: exemptionAm,
    certificateUploaded: certificateUploaded,
    setCert: setCertificate,
    exemptedCheck: exemptedCheck,
    myRegId: regid
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
