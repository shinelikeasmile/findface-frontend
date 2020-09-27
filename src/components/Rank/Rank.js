import React from 'react';

const Rank = ({name,entries})=>{
	return(
		<div>
			<div className="dark-blue f2 b">
			{name}{',your current rank is .. '}
			</div>
			<div className="dark-blue f1 b">
			{entries}
			</div>
		</div>
		)
}
export default Rank;

