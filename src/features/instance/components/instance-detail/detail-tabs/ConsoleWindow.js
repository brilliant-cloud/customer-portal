import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Iframe from 'react-iframe';
import {Button} from "antd";



class ConsoleWindow extends React.Component{
    constructor(props){

        super(props);
        this.state={frameLink:null, show: false};

        this.renderIframe=this.renderIframe.bind(this);

    };
    renderIframe=()=> {
        this.setState({show: true});
    };




    componentDidMount(){
        const scopedToken = localStorage.getItem("scopedToken");
        const header = {
            headers: {
                "X-Auth-Token": scopedToken
            }
        };
        const postData = {

            "os-getVNCConsole": {
                "type": "novnc"
            }

        };
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://118.67.215.10:8774/v2.1/servers/"+this.props.instanceID+"/action";
       
         axios.post(proxyurl + url,postData, header)
            .then((response)=>{
                if (response) {

                    this.setState({
                        frameLink: response.data.console.url
                    });
                
                    this.setState({
                        show:true
                    })
                }
            })
             .catch(error=>{
                 console.log(error)
             })



    }


    render(){
        const {show} = this.state;
        let frame;
        if (show) {
            frame = <Iframe  src={this.state.frameLink}
                             width="100%"
                             height="800"
                             tabIndex={0}
                             scrolling="yes"
                             allowFullScreen="yes"
                             display="initial"


            />;


        }
      

        return(
            <div>

                {frame}


                Click On Blue Status Bar to Activate Terminal
            </div>

        )
    }
}
export default ConsoleWindow;