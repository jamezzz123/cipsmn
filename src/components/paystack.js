import React, { useCallback, useContext } from 'react'
import axios from '../default_axios'
import { toast } from 'react-toastify'
import { usePaystackPayment } from 'react-paystack'
import AuthContext from '../store/auth-context'

// you can call this function anything

// regular
// exemption
// honorary
// conference
// exam
// donation

const onClose = (errorDisplay) => {
  // implementation for whatever you want to do when the Paystack dialog closed.
  toast.error(
    'Could not register your payment, please try again later \n' +
    errorDisplay || '',
    {
      position: 'top-center',
      theme: 'dark',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  )
  console.log('closed')
}

export default function MakePayments({ text, details, className, style, token, func = () => null }) {
  const authCtx = useContext(AuthContext)

console.log("amount is:" + details.amount)
  const registerPayment = useCallback(
    (referenceID, status) => {
      axios
        .post(
          '/user/payment/create',
          {
            type: details.type || 'exam',
            name: details.name,
            amount: details.amount || details.anAmount || '0',
            status: status,
            userid: authCtx.username || '',
            purpose:
              `Payment for ${details.description}... Reference = { ${referenceID} }` ||
              '',
            name: details.description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            console.log(response)
            if (details.type == "regular") authCtx.setRegular(true)
            else if (details.type == "exemption") authCtx.setExemption(true)
            //setIsLoading(false)
            toast.success(response.data.message, {
              position: 'top-center',
              theme: 'dark',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else {
            throw new Error('Something went wrong')
          }
        })
        .catch((err) => {
          let errMssg = err.message || 'Something went wrong, please try again'

          let errors = !err.response
            ? { Error: errMssg }
            : !err.response.data
              ? { Error: errMssg }
              : err.response.data

          let errorDisplay = Object.keys(errors)
            .map((each, key) => `${key + 1}. ${each}: ${errors[each]}`)
            .join('\n')

          toast.error(
            'Could not register your payment, please try again later \n' +
            errorDisplay,
            {
              position: 'top-center',
              theme: 'dark',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          )
        })
    },
    [token]
  )

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    registerPayment(
      `trxref: ${reference.trxref || ''}, reference: ${reference.reference || ''
      }, status: ${reference.status || ''}, trans: ${reference.trans || ''}, message : ${reference.message || ''}`,
      reference.status
    )
    func()
    console.log(reference)
  }


  let config = {
    // reference: (new Date()).getTime().toString(),
    email: details.email || 'user@example.com',
    amount: Number(details.amount) * 100 || 20000,
    description: details.description,
    publicKey: 'pk_test_7fb9c1325e050a018a943cb7c5aaf6a2710d6a84',
    // ...details,
  }

  const initializePayment = usePaystackPayment(config)
  return (
    <div>
      <button
        style={{ ...style }}
        className={`${className || 'mb-1 mt-1 me-1 btn btn-warning'}`}
        onClick={() => {
          initializePayment(onSuccess, onClose)
        }}
      >
        {text || 'Paystack Hooks Implementation'}
      </button>
    </div>
  )
}


export const usePaymentsFunc = (details, token, func) => {

  const registerPayment = (referenceID, status) => {
    axios
      .post(
        '/user/payment/create',
        {
          type: details.type || 'exam',
          amount: details.amount || 0,
          status: status,
          userid: details.email || '',
          purpose:
            `Payment for ${details.description}... Reference = { ${referenceID} }` ||
            '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          console.log(response)
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        let errMssg = err.message || 'Something went wrong, please try again'

        let errors = !err.response
          ? { Error: errMssg }
          : !err.response.data
            ? { Error: errMssg }
            : err.response.data

        let errorDisplay = Object.keys(errors)
          .map((each, key) => `${key + 1}. ${each}: ${errors[each]}`)
          .join('\n')

        toast.error(
          'Could not register your payment, please try again later \n' +
          errorDisplay,
          {
            position: 'top-center',
            theme: 'dark',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      })
  }

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    registerPayment(
      `trxref: ${reference.trxref || ''}, reference: ${reference.reference || ''
      }, status: ${reference.status || ''}, trans: ${reference.trans || ''}, message : ${reference.message || ''}`,
      reference.status
    )
    console.log(reference)
  }

  let config = {
    // reference: (new Date()).getTime().toString(),
    email: details.email || 'user@example.com',
    amount: String(Number(details.amount) * 100) || 20000,
    description: details.description,
    publicKey: 'pk_test_7fb9c1325e050a018a943cb7c5aaf6a2710d6a84',
    // ...details,
  }

  const initializePayment = usePaystackPayment(config)
  console.log('initializing...')
  initializePayment(onSuccess, onClose)
  func(false)
  return initializePayment(onSuccess, onClose)
}
