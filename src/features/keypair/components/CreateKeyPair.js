import React,{Component} from 'react';
import { Button, Modal,Input } from 'antd';
import {combineURL} from "app/commons/common";

class CreateKeyPair extends  Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            name: '' // Key-Par name
        };

        this.createKeyPair = this.createKeyPair.bind(this);

        this.showModal =  () => this.setState({ visible: true});

        this.closeModal = () => this.setState({visible: false});

        this.handleChange = ({target: {value}}) => {
            console.log(value);
            this.setState({
                name: value
            })
        };
    }


    createKeyPair(){
        this.setState({visible:false});
        const scopedToken = localStorage.getItem("scopedToken");

        //const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = combineURL('getKeypairs');

        const data = {
            "keypair":{
                "name":this.state.name
            }
        };
        console.log(data);

        fetch( url,{
            method: 'post',
            headers: {
                'X-Auth-Token': scopedToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })
            .then(response=> response.json())
            .then(data=>{console.log(data)})
            .catch((err)=>{
                console.log(err);
            })

    }



    render(){

        return(
            <div>
                <Button type="primary" style={{ marginRight:'40px'}} onClick={this.showModal}>Create Key Pair</Button>

                <Modal
                    title="Create Key Pair"
                    visible={this.state.visible}
                    onCancel={this.closeModal}
                    onOk={this.createKeyPair}
                    okText="Create"
                    cancelText="Cancel"
                >
                    <Input placeholder="Key Pair Name" onChange={this.handleChange}/>
                </Modal>

            </div>
        )
    }

}

export default CreateKeyPair;