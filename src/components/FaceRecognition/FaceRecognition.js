import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl,box}) =>{
	let display_boxes=[];
	for(var i=0;i<box.length;i++){
		display_boxes.push(<div key={i} className='bounding-box' style={{top:box[i].topRow, right:box[i].rightCol, bottom:box[i].bottomRow, left:box[i].leftCol}}></div>);
	}
	return (
		<div className='center'>
		<div className="absolute mt2">
			<img id='inputimage' alt="" src={imageUrl} width='600px' height='auto'/>
			{display_boxes}
		</div>
		</div>
		);
}

export default FaceRecognition;

