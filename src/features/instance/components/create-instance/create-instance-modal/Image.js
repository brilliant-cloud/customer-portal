import React from 'react';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/orm/glance';
import { Spin, Table } from 'antd';
import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/common/constants';
import filesize from 'filesize';

import { choosedImage } from 'features/instance/actions';

class Image extends React.Component {
  constructor(props) {
    super(props);

  }

  onSelectChange = (selectedRows) => {
    this.props.dispatch(choosedImage(selectedRows[0]));
  };

  componentWillMount() {
    if (!this.props.choosedImage) {
      let images = this.props.images;
      let defaultImageIndex = images.items.findIndex(ele => images.itemsById[ele].name === 'cirros');
      this.props.dispatch(choosedImage(images.items[defaultImageIndex]));
    }
  };

  render() {
    const rowSelection= {
      type: 'radio',
      onChange: this.onSelectChange,
      selectedRowKeys: [this.props.choosedImage],
    };

    //
    const columns = [];
    IMAGE_TABLE_COLUMN.forEach(title => {
      let render;
      if (title === 'size') {
        render = (text) => {
          let size = filesize(text);
          return <div>{size}</div>
        }
      }

      if (title !== 'status') {
        columns.push({
          title: IMAGE_FIELD[title],
          key: title,
          dataIndex: title,
          render: render,
        })
      }
    });

    //
    let data = [];
    let images = this.props.images;
    images.items.forEach(imageId => {
      data.push(images.itemsById[imageId]);
    });

    if (this.props.images.loading) {
      return (
        <Spin />
      )
    } else {
      return (
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

function mapStateToProps(state) {
  return {
    images: selectImages(state),
    choosedImage: state.features.instance.create.choosedImage,
  }
}

export default connect(mapStateToProps, null)(Image);