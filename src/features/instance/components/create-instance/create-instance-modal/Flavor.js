import React from 'react';
import { connect } from 'react-redux';
import { selectFlavors } from 'app/selectors/orm/nova';
import { FLAVOR_TABLE_COLUMN, FLAVOR_FIELD } from 'features/common/constants';
import { choosedFlavor } from 'features/instance/actions';

import { Spin, Table } from 'antd';

class Flavor extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRows) => {
    this.props.dispatch(choosedFlavor(selectedRows[0]));
  };

  componentWillMount() {
    if (!this.props.choosedFlavor) {
      let defaultFlavorId = this.props.flavors.items[0];
      this.props.dispatch(choosedFlavor(defaultFlavorId));
    }
  };

  render() {
    const rowSelection = {
      type: 'radio',
      onChange: this.onSelectChange,
      selectedRowKeys: [this.props.choosedFlavor],
    };

    if (this.props.flavors.loading) {
      return (
        <Spin />
      )
    } else {
      const columns = [];
      FLAVOR_TABLE_COLUMN.forEach(title => {
        columns.push({
          title: FLAVOR_FIELD[title],
          key: title,
          dataIndex: title,
        })
      });

      let flavors = this.props.flavors;
      const data = [];
      flavors.items.forEach(flavorId => {
        data.push(flavors.itemsById[flavorId])
      });
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          size="middle"
          rowKey='id'
          pagination={false}
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  flavors: selectFlavors(state),
  choosedFlavor: state.features.instance.create.choosedFlavor,
});

export default connect(mapStateToProps, null)(Flavor);