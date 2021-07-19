import { Popover, Button } from 'antd';
import React from "react"

const WithdrawDetails =(props)=>{
    const content = (
        <div style={{maxWidth:"300px"}}> 
        
          {props&&props.details&&props.details.length>0&&props.details[0].tag=="Bank Transfer"?
           <div  className="shadowed">

           <div className="dash-row dash-row-centralized">
             <div style={{ width: '50%', textAlign: 'left' }}>Bank Transfer</div>
             <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>name</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].name}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>bank name</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].bankName}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>bank account number</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].bankCountrybankAccountNumber}</div>
               </div>
             </div>

           </div>
           </div>


         
              
          
          :props&&props.details&&props.details.length>0&&props.details[0].tag=="Cryptocurrency"? <div className="shadowed">

          <div className="dash-row dash-row-centralized">
            <div style={{ width: '50%', textAlign: 'left' }}>Crypto Transfer</div>
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">  
                <div style={{ width: '50%', textAlign: 'left' }}>name</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].name}</div>
              </div>
            </div>
            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">  
                <div style={{ width: '50%', textAlign: 'left' }}>crypto currency name</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].cryptoCurrencyName}</div>
              </div>
            </div>

            <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
              <div className="dash-row dash-row-centralized">    
                <div style={{ width: '50%', textAlign: 'left' }}>crypto currency address</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{props.details[0].cryptoCurrencyAddress}</div>
              </div>
            </div>

          </div>
          </div>:null}
        </div>
       
      );
 return(<>
 <Popover placement={"bottom"} content={content}  >
    <Button type="link">Show Details</Button>
  </Popover>
 </>)   
}

export default WithdrawDetails