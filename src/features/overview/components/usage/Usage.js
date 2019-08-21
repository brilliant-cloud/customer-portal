import React from 'react';
import { connect } from 'react-redux';
import { combineURL } from 'app/commons/common';
import { Spin, DatePicker, Button } from 'antd';
import UsageItem from './UsageItem';
import moment from 'moment';
import { selectLogin } from 'app/selectors/orm/auth';
import styles from './style/Usage.css';

class Usage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startValue: null,
      endValue: null,
      loading: false,
      tenantUsage: {}
    }
  }

  onSubmitDate = () => {
    this.getTenantUsage()
  };

  onChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    });

  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  disabledStartDate = (value) => {
    if (value) {
      return value.valueOf() > moment().endOf('day').valueOf();
    }
  };

  disabledEndDate = (value) => {
    if (value) {
      return value.valueOf() > moment().endOf('day').valueOf();
    }
  };

  getTenantUsage = () => {
    let scopedToken = localStorage.getItem('scopedToken');
    let projectID = localStorage.getItem('projectID');
    let tmpl = {'project_id': projectID};
    let url = combineURL('getTenantUsage', tmpl);
    let startTime, startUTCTime, endTime, endUTCTime;
    if (this.state.startValue && this.state.endValue) {

      startTime = moment(this.state.startValue).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      startUTCTime = moment(this.state.startValue).startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss');


      endTime = moment(this.state.endValue).endOf('day').format('YYYY-MM-DDTHH:mm:ss');
      endUTCTime = moment(this.state.endValue).endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss');

    } else {

      startTime = moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      startUTCTime = moment().subtract(1, 'days').startOf('day').utc().format('YYYY-MM-DDTHH:mm:ss');


      endTime = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss');
      endUTCTime = moment().endOf('day').utc().format('YYYY-MM-DDTHH:mm:ss');
    }

    url = url + '&start=' + startUTCTime + '&end=' + endUTCTime;

    fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': scopedToken
      }
    }).then((res) => {
      res.json().then((resBody) => {
        this.setState({
          loading: true,
          tenantUsage: resBody.tenant_usage,
          startValue: startTime.split('T')[0],
          endValue: endTime.split('T')[0]
        });
      })
    })
  };

  componentWillMount() {
    this.getTenantUsage();
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className={styles.header}>
            <span className={styles.title}>Usage Summary </span>

            <DatePicker
              size="large"
              className={styles.date}
              disabledDate={this.disabledStartDate}
              placeholder={this.state.startValue}
              onChange={this.onStartChange}
            />

            <DatePicker
              size="large"
              className={styles.date}
              disabledDate={this.disabledEndDate}
              placeholder={this.state.endValue}
              onChange={this.onEndChange}
            />

            <Button
              size="large"
              type="primary"
              onClick={this.onSubmitDate}
            >
              Submit
            </Button>
          </div>
          <UsageItem
            tenantUsage={this.state.tenantUsage}
          />
        </div>
      )
    } else {
      return (
        <Spin />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: selectLogin(state),
  }
};

export default connect(mapStateToProps, null)(Usage);