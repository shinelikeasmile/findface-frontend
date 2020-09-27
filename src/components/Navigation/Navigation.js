import React from 'react';
const Navigation = ({onrouteChange}) =>{
	return(
		<nav style={{display:'flex',justifyContent:'flex-end'}}>
		<p onClick={()=>{onrouteChange("signin")}} className="f3 pa3 link dim b dark-blue underline pointer">sign out</p>
		</nav>
		) 
}
export default Navigation;