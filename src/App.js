import React,{Component}from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration';

const intialState = {
     input:"",
      imageUrl:"",
      box:{},
      route:'signin',
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
  }
};
class App extends Component {
  constructor(){
    super();
    this.state=intialState;
  }
  loadUser=(data)=>{
    this.setState({
       user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
   let number_of_faces = data.outputs[0].data.regions.length-1;
   let array_of_faces=[];
   while(number_of_faces>=0){
    array_of_faces.push(data.outputs[0].data.regions[number_of_faces].region_info.bounding_box);
    number_of_faces--;
   }
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   let array_of_boxes=[]
   for(var i=0;i<array_of_faces.length;i++)
   {
     array_of_boxes.push({
     leftCol:array_of_faces[i].left_col*width,
     topRow :array_of_faces[i].top_row*height,
     rightCol:width-(array_of_faces[i].right_col*width),
     bottomRow:height-(array_of_faces[i].bottom_row*height),
                    })
   }
   return array_of_boxes;
 }
  displayFaceBox = (box) => {
      this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl:this.state.input})
    if(!this.state.input){console.log("no url specified");return;}
    fetch("https://findface-api.herokuapp.com/imageurl",{
                method:'post',
                headers:{'Content-type':'application/json',
                          'Accept': 'application/json'},
                body:JSON.stringify({
                  input:this.state.input 
                })
              })
      .then(response=>response.json())
      .then(response => {
           if(response){
                fetch("https://findface-api.herokuapp.com/image",{
                method:'put',
                headers:{'Content-type':'application/json',
                          'Accept': 'application/json'},
                body:JSON.stringify({
                  id:this.state.user.id
                })
              }).then(response=>response.json())
              .then(count=>{this.setState(Object.assign(this.state.user,{entries:count}))})
               .catch(console.log)
            }
       this.displayFaceBox(this.calculateFaceLocation(response));
      }) 
      .catch(error => console.log(error));
  }
  onrouteChange = (new_route) =>{
    this.setState({imageUrl:''});
    this.setState({route:new_route});
  }
  render() {
    return (
    <div className="App">
                <Particles className="particles"
              params={{
                particles: {
                  number : {
                    value:100,
                    density: {
                      enable: true,
                      value_area:1000,
                      color: "black"
                    }
                  }
                }
              }}
            />
    { this.state.route === 'home' 
      ?  <div> 
            <Navigation onrouteChange={this.onrouteChange} />
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
         </div>  
      : ( 
          this.state.route === 'signin' 
          ? <Signin onrouteChange={this.onrouteChange} loadUser={this.loadUser}/>
          : <Registration onrouteChange={this.onrouteChange} loadUser={this.loadUser}/>
        )
    }
    </div>
  );
  }
}

export default App;
