var React = require('react'),
    moment = require('moment');

var inputs = new Object();

inputs.PostcodeSelector = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.props.parsePostCode} onChange={this.props.updatePostCode} name='postcode' className='postcode-selector'>
        <input type='text' placeholder='Postcode...' value={this.props.postCode} />
      </form>
    );
  }
});

inputs.DatePicker= React.createClass({
  render: function() {
    var dateOptions = new Array();
    for (i in this.props.range){
      var rawDate = moment(this.props.range[i]);
      var formattedDate = rawDate.format("dddd Do MMMM")
      var option = <option key={i} value={this.props.range[i]}>
        {formattedDate}
      </option>
      dateOptions[i] = option;
    }

    return (
      <div className='date-picker'>
        <select name='date' onChange={this.props.updateDate}>
          <option value='none'>Select a date</option>
          {dateOptions}
        </select>
      </div>
    );
  }
});

inputs.TimeSelector = React.createClass({
  render: function() {
    return (
      <div className='time-selector'>
        <select onChange={this.props.updateTime} name='time'>
          <option value='none'>Select a time</option>
          <option value='05:00'>5:00</option>
          <option value='06:00'>6:00</option>
          <option value='07:00'>7:00</option>
          <option value='08:00'>8:00</option>
          <option value='09:00'>9:00</option>
          <option value='10:00'>10:00</option>
          <option value='11:00'>11:00</option>
          <option value='12:00'>12:00</option>
          <option value='13:00'>13:00</option>
          <option value='14:00'>14:00</option>
          <option value='15:00'>15:00</option>
          <option value='16:00'>16:00</option>
          <option value='17:00'>17:00</option>
          <option value='18:00'>18:00</option>
          <option value='19:00'>19:00</option>
          <option value='20:00'>20:00</option>
          <option value='21:00'>21:00</option>
          <option value='22:00'>22:00</option>
        </select>
      </div>
    );
  }
});

module.exports = inputs;
