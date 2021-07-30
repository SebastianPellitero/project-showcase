import Cookies from 'universal-cookie';
 
export async function auth() {
   const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           grant_type: 'client_credentials',
           client_id: process.env.REACT_APP_CLIENT_ID,
           client_secret: process.env.REACT_APP_CLIENT_SECRET
       })
   };
 
   const response = await fetch(
       'https://api.foleon.com/oauth',
       requestOptions
   );
 
   const userInfo = await response.json();
   const cookies = new Cookies();
   cookies.set('token', userInfo.access_token);
}
