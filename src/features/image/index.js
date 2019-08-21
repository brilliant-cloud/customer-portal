import React from 'react';
import { connect } from 'react-redux';
import { getImages } from 'app/orm/glance/image/actions';
import ImageTable from 'features/image/components/ImageTable';
import commonStyles from 'features/common/styles.css';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getImages());
  }

  render() {
    return (
      <div className={commonStyles.wrapper}>
        <ImageTable />
      </div>
    )
  }
}

export default connect(null, null)(Image);