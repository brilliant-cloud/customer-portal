import React from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import { selectImages } from 'app/selectors/orm/glance';
import filesize from 'filesize';

import { IMAGE_TABLE_COLUMN, IMAGE_FIELD } from 'features/common/constants';

class ImageTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.images.loading) {
      return (
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
      )
    } else {
      let columns = [];
      IMAGE_TABLE_COLUMN.forEach((title) => {
        let sorter, render;
        switch(title) {
          case 'name': {
            sorter = (a, b) => a.name.length - b.name.length;
            break;
          }

          case 'size': {
            render = (text) => {
              let size = filesize(text);
              return (
                <div>{size}</div>
              )
            };
            break;
          }

          default:
            break;
        }

        columns.push({
          title: IMAGE_FIELD[title],
          key: title,
          dataIndex: title,
          sorter: sorter,
          render: render
        })
      });

      let images = this.props.images;
      let dataArrs = [];
      images.items.forEach(imageId => {
        let image = images.itemsById[imageId];
        let data = {};
        IMAGE_TABLE_COLUMN.forEach(col => {
          data['id'] = imageId;
          data[col] = image[col];
        });
        dataArrs.push(data);
      });

      return (
        <Table
          columns={columns}
          bordered
          size="middle"
          dataSource={dataArrs}
          rowKey='id'
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    images: selectImages(state)
  }
}

export default connect(mapStateToProps, null)(ImageTable);
