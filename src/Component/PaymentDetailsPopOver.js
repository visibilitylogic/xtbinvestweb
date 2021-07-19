import { Popover, Button } from 'antd';
import React from "react"

const PaymentDetails =(props)=>{
    const content = (
        <div style={{maxWidth:"450px"}}> 

          {props&&props.details&&props.details.method=="Card Deposit"?
           <div  className="shadowed">

           <div className="dash-row dash-row-centralized">
             <div style={{ width: '50%', textAlign: 'left' }}>Card Bearer Details</div>
             <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
             <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Card Holder Name</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.cardName}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Card Number</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.cardNumber}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>CVV</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.cardCvv}</div>
               </div>

               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Expiry Month</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.cardMonth}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Expiry Year</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.cardYear}</div>
               </div>
               {props.details.homeAddress&&<div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Home Address</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.homeAddress}</div>
               </div>}
               {props.details.yourCountry&&<div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Country</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.yourCountry}</div>
               </div>}
               {props.details.yourState&&<div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>City</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.yourState}</div>
               </div>}
               {props.details.zipCode&&<div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Zip Code</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.zipCode}</div>
               </div>}
             </div>

           </div>
           </div>


         
              
          
          :props&&props.details&&props.details.method=="Cryptocurrency"? <div className="shadowed">

          <div className="dash-row dash-row-centralized">
            <div style={{ width: '50%', textAlign: 'left' }}>Crypto Transfer</div>
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">  
                <div style={{ width: '50%', textAlign: 'left' }}>Name</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details.name}</div>
              </div>
            </div>
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">  
                <div style={{ width: '50%', textAlign: 'left' }}>Amount</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details.amount}</div>
              </div>
            </div>
{/* 
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">    
                <div style={{ width: '50%', textAlign: 'left' }}>crypto currency address</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].cryptoCurrencyAddress}</div>
              </div>
            </div> */}

          </div>
          </div>:null}
        </div>
       
      );
 return(<>
 <Popover placement={"right"} content={content}  >
    <Button type="link">Show Details</Button>
  </Popover>
 </>)   
}

export default PaymentDetails