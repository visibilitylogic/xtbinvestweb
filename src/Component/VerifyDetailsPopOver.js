import { Popover, Button } from 'antd';
import React from "react"

const VerifyDetail  =(props)=>{
    const content = (
        <div style={{maxWidth:"300px"}}> 
        
          {props&&props.details?
           <div  className="shadowed">

           <div className="dash-row dash-row-centralized">
             <div style={{ width: '100%', textAlign: 'left' }}>User Verification Details</div>
             <div style={{ width: '100%', fontSize: '14px', padding: '10px 0' }} className="details">
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>name</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.name}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Phone Number</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.phoneNumber}</div>
               </div>
               <div className="dash-row dash-row-centralized">
                 <div style={{ width: '50%', textAlign: 'left' }}>Address</div>
                 <div style={{ width: '50%', textAlign: 'right' }}>{props.details.address}</div>
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

export default VerifyDetail 