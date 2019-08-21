import { combineReducers } from 'redux';
import { monitor } from 'app/orm/influxdb/monitor/reducers';

const influxdb = combineReducers({
  monitor
});

export default influxdb;
