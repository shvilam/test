import React from 'react';
import { Radio, Space, InputNumber, Input, Flex, Button } from 'antd';
import {ConfigProvider} from 'antd';
import './App.css';
import {  Typography } from 'antd';
const { Text , Title} = Typography;
const TRANZILLA_URL_TEMPLATE = `https://direct.tranzila.com/achim5/iframenew.php?currency=1&nologo=1&lang=il&u71=1&cred_type=1&buttonLabel=לתרומה`
const donationInfo = {
  amount: 0,
  recurring: false,
  phoneNumber: null,
  email: null,
  fullName: null,
};
function App() {
  
  const [paymentType, setTymentType] = React.useState('recurring');
  const [amount, setAmount] = React.useState<number>(0);
  const [customAmount, setCustomAmount] = React.useState<number>(0);
  const [url, setUrl] = React.useState('');
  const [erreMsg, setErrMsg] = React.useState('');
  const [fullName, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showIframe, seShowIframe] = React.useState(false);

  const [finalAmount,setFinalAmount] = React.useState(0);
  //console.log('finalAmount', customAmount);
  const onSetPredfineAmount = (amount: number) => {
    setFinalAmount(amount);
    setAmount(amount);
    setCustomAmount(0); 
  }
  const onSetCustomAmount = (amount: number) => {
    const amountNum = parseInt(amount.toString())
    if(!isNaN(amountNum)){
      setFinalAmount(amountNum);
      setAmount(0);
      setCustomAmount(amountNum); 
    }
  }
  
  const onNext  = () => {
    console.log('paymentType',{ paymentType,finalAmount, customAmount, amount, fullName, email, phone});
    if (finalAmount === 0){
      setErrMsg('יש לבחור סכום תרומה');
      return;
    }
    console.log(fullName === '' , email === '' , phone === '')
    if (fullName === '' || email === '' || phone === ''){
      
      setErrMsg('יש למלא פרטים אישיים');
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const standLocation = urlParams.get('standLocation');
    let url = TRANZILLA_URL_TEMPLATE.slice()
	  url = setSum(url, donationInfo.amount);
	  url = setRecurring(url, paymentType === 'recurring' ? true : false);
	  url = setUserInfo(url ,phone , fullName, email);
    url = setStandLocation(url, standLocation);
    seShowIframe(true);
    setErrMsg('');
    setUrl(url);
  } 
  function setStandLocation(url:string, standLocation: string | null):string{
    if (standLocation) {
        url +='&location='+ standLocation;
    }
    return url
} 
function setSum(url:string, sum: any): string{
	url +='&sum='+ sum;
	return url;
}
function setRecurring(url:string, recurring: boolean): string{
    console.log({recurring});
	if (recurring === true ) {
        url += '&recur_transaction=4_approved&bit_pay=0';
    } else {
        url +='&bit_pay=1&google_pay=1';
    }
	return url;
}
function setUserInfo(url: string, phone: string, fullName: string , email: string):string {
	url += '&email='+email+'&contact='+fullName+'&phone='+phone;
	return url;
}

  
  return (
      <ConfigProvider
      theme={{
        
        token: {
          // Seed Token
          colorPrimary: '#3B3B1D',
  
          // Alias Token
          //colorBgContainer: '#f6ffed',
        },
      }}
    >
    
    <div className="App">
      <header className='page' >
        <img src="Untitled 2.png"  alt="logo"  />
        <section className='headerStyle'>
          <div className='headerContent'>
          <h1 className='pageTitile'>אחים ואחיות לנשק  - למען הדמוקרטיה</h1>
          <p className='headerText'>
                העמותה הוקמה ע"י קבוצת מילואימניקים,
                <br></br>
        כדי להגן על מדינת ישראל מפני נסיון ההפיכה המשטרית שאיימה על הדמוקרטיה הישראלית.
<br></br>
        לאחר אסון השבעה ב
        אוקטובר ברור, שכדי לצמוח ולהתחדש,
        <br></br>
         מדינת ישראל זקוקה להנהגה מאחדת ומשקמת. עזרו לנו לפעול לבניית עתיד משותף,
        שישמור על ישראל<br></br>
        חזקה יהודית, דמוקרטית ושוויונית. 
        <br></br>
        </p>
        </div>
        </section>
      </header>
      <div className="mainPage">
        <section>
              <h2>בחרו סוג תרומה:
              </h2>
            
              <Space>
            <Radio.Group size="large" value={paymentType} onChange={(e) => setTymentType(e.target.value)}>
              <Radio.Button  className='clsAmount' value="onTime">חד פעמית</Radio.Button>
              <Radio.Button className='clsAmount' value="recurring">חודשית</Radio.Button>
            </Radio.Group>
          </Space>
        </section>
        <section>
        <h2> סכום תרצו לתרום?</h2>
            <Radio.Group size="large" value={amount} onChange={(e) => onSetPredfineAmount(e.target.value)}>
              <Radio.Button value="50">₪50</Radio.Button>
              <Radio.Button value="100">₪100</Radio.Button>
              <Radio.Button value="150">₪150</Radio.Button>
              <Radio.Button value="200">₪200</Radio.Button>
              <Radio.Button value="300">₪300</Radio.Button>
              <Radio.Button value="500">₪500</Radio.Button>
              <Radio.Button value="1000">₪1000</Radio.Button>
              <Radio.Button value="2000">₪2000</Radio.Button>
            </Radio.Group>
        </section>
        <section>
          <p>
            <h2>סכום אחר  </h2>
              <InputNumber size='large' type="text" defaultValue={0}  addonAfter="₪"  step="1"  onChange={(e: any) => onSetCustomAmount(e)} />
          </p>
        </section>
        <section className='lastSection'>
          <h2>סך הכל לתרומה:
            
          ₪{finalAmount}
          </h2>
          </section>
          {showIframe ? null : <section className='userInfo'>
            <p>
            בלחיצה על  כפתור ״תשלום״ אני מאשר שקראתי את תנאי השימוש ואת מדיניות הפרטיות
            </p>
            <p>
              <h3>פרטים אישיים</h3>
            </p>
          <Flex className='docationForm' wrap="wrap" gap="middle"  align="center" > 
              <Input size='large' onChange={(e) => setFullname(e.target.value)} placeholder="שם מלא" addonBefore="שם מלא"/>  
              <Input size='large' onChange={(e) => setPhone(e.target.value)} addonBefore="טלפון"  placeholder="טלפון" />
              <Input size='large' onChange={(e) => setEmail(e.target.value)} addonBefore="איצייל" placeholder="אימייל" />
              <div className='btnsNext'>
                <Button type="primary" size='large' onClick={()=> onNext()}>הבא</Button>
                <Title level={3} type="danger">{erreMsg}</Title>
              </div>
          </Flex>
          </section>}
          
      </div>
      {showIframe ? <iframe  allowPaymentRequest title='pyment' className='iFrame' src={url} width="100%" height="100%" allow="fullscreen" ></iframe>:null}
    </div>
    </ConfigProvider>  );
}

export default App;
