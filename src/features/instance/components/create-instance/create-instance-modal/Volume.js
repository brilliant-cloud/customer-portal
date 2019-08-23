import React from 'react';
import filesize from 'filesize';
import {connect} from 'react-redux';
import {selectVolumes} from "app/selectors/orm/cinder";
import { VOLUME_FIELD, VOLUME_TABLE_COLUMN} from "features/common/constants";
import {Spin, Table} from "antd";
import { choosedVolume} from 'features/instance/actions';

class VolumeSelection extends React.Component{
    constructor(props){
        super(props);

    }

    onSelectChange = (selectedRows) => {
        console.log(selectedRows)
        this.props.dispatch(choosedVolume(selectedRows[0]));
    };

    render(){

        const rowSelection={
            type: 'radio',
            onChange: this.onSelectChange,
            selectedRowKeys: this.props.choosedVolume,
        };
        console.log(rowSelection);
        const columns = [];
        VOLUME_TABLE_COLUMN.forEach(title =>{
            let render;
            if (title === 'size') {
                render = (text) => {
                    let size = filesize(text);
                    return <div>{size}</div>
                }
            }

            if (title !== 'status') {
                columns.push({
                    title: VOLUME_FIELD[title],
                    key: title,
                    dataIndex: title,
                    render: render,
                })
            }
        });
        console.log(VOLUME_TABLE_COLUMN);

        let data = [];

        let volumes = this.props.volumes;
        console.log(volumes);

        volumes.items.forEach(volumeId =>{
            data.push(volumes.itemsById[volumeId]);
        });



        if(this.props.volumes.loading){
            return(
                <Spin/>
            )
        }else{
            return(
                <Table
                    showHeader={false}
                    columns={columns}
                    dataSource={data}
                    rowKey='id'
                    scroll={{y: 300}}
                    size="middle"
                    rowSelection={rowSelection}
                    pagination={false}
                />
            )
        }

    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        volumes: selectVolumes(state),
        choosedVolume: state.features.instance.create.choosedVolume,
    }
}


export default connect(mapStateToProps,null)(VolumeSelection);