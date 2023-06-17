import React, { useState, useEffect, useCallback, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import PayStack, { usePaymentsFunc } from '../../components/paystack'


const Donate = () => {

  const authCtx = useContext(AuthContext)

  const [amount, setAmount] = useState(0)
  console.log(amount)

  return (
    <section role='main' className='content-body card-margin'>
      <header className='page-header'>
        <h2>Make Donation</h2>
      </header>
      {/* start: page */}
      <div className='row'>
        <div className='col'>
          <section className='card'>
            <header className='card-header'>
              <div className='card-actions'>
                <a
                  href='#'
                  className='card-action card-action-toggle'
                  data-card-toggle
                />
              </div>
              <h2 className='card-title'>Make Donation</h2>
              <p className='card-subtitle'>
                Select Donation type and make payment
              </p>
            </header>
            <div className='card-body'>
              <div className='form-horizontal form-bordered'>
                <div className='form-group row pb-4'>
                  <div className='form-group row pb-4'>
                    <label className='col-lg-3 control-label text-lg-end pt-2'>
                      Select Payment Type
                    </label>
                    <div className='col-lg-6'>
                      <input id="amount" name="amount" type="number" value={amount} onChange={(val) => setAmount(val.target.value)} className=" m-1 form-control form-control-lg" placeholder="Enter Amount" />
                      <PayStack
                        details={{
                          description: authCtx.username + ' Donation... ',
                          type: 'donation',
                          email: authCtx.username,
                          amount: String(amount),
                          anAmount: String(amount),
                        }}
                        token={authCtx.token}
                        text={'Make Donation'}
                        className='mb-1 mt-1 me-1 btn btn-primary'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* end: page */}
    </section>
  )
}

export default Donate
