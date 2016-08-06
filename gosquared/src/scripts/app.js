import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { credentials } from './credentials.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      begun: false,
      idQuery: '1',
      userActivity: new Array(),
      userProfile: new Object(),
      maxCount: 0
    }

    this.updateIdQuery = this.updateIdQuery.bind(this);
    this.submitIdQuery = this.submitIdQuery.bind(this);
  }

  getActivity(userId) {
    const root = 'https://ad84bd10.ngrok.io/people/v1/people/';
    const mods = '/aggregate/feed_histogram';

    var token = credentials.site_token;
    var key = credentials.api_key;

    return root + userId + mods + '?site_token=' + token + '&api_key=' + key;
  }

  getProfile(userId) {
    const root = 'https://ad84bd10.ngrok.io/people/v1/people/';

    var token = credentials.site_token;
    var key = credentials.api_key;

    return root + userId + '?site_token=' + token + '&api_key=' + key;
  }

  callUserInfo(userId) {
    $.get(this.getActivity(this.state.idQuery), function (result) {
      var listOfCounts = new Array();
      result.list.forEach(function(item){
        listOfCounts.push(item.count);
      });
      this.setState({
        userActivity: result.list,
        begun: true,
        maxCount: Math.max(...listOfCounts)
      });
    }.bind(this));

    $.get(this.getProfile(this.state.idQuery), function (result) {
      this.setState({
        userProfile: result
      });
    }.bind(this));
  }

  updateIdQuery(e) {
    this.setState({idQuery: e.target.value});
  }

  submitIdQuery(e) {
    e.preventDefault();
    this.callUserInfo(parseInt(this.state.idQuery));
  }

  render() {
    if (this.state.begun === true) {
      return <UserProfile maxCount={this.state.maxCount} activity={this.state.userActivity} profile={this.state.userProfile} />
    }
    else if (this.state.begun === false){
      return <div className='app--begin'>
        <Begin idQuery={this.state.idQuery} updateIdQuery={this.updateIdQuery} submitIdQuery={this.submitIdQuery} />
      </div>
    }
  }
}

class Begin extends React.Component {
  render() {
    return <form onSubmit={this.props.submitIdQuery} className='begin-module'>
      <h1 className='begin-module__title'>Choose a user ID</h1>
      <input className='begin-module__id-input' value={this.props.idQuery} onChange={this.props.updateIdQuery} placeholder='ex. 1' />
    </form>
  }
}

class UserProfile extends React.Component {
  render() {
    return <div className='app'>
      <UserInfo info={this.props.profile} />
      <UserActivity maxCount={this.props.maxCount} activity={this.props.activity} />
    </div>
  }
}

class UserInfo extends React.Component {
  render() {
    var p = this.props.info;
    return <div className='user-profile'>
      <h1 className='user-profile__name'>{p.name}</h1>
      <p className='user-profile__email'>{p.email}</p>
      <p className='user-profile__bio'>{p.description}</p>
    </div>
  }
}

class UserActivity extends React.Component {
  render() {
    console.info('Highest count is ' + this.props.maxCount);
    return <div className='user-activity'>
      <h1 className='user-activity__title'>Person Activity</h1>
      <ul className='activity-list'>
        {this.props.activity.map(function(item, i) {
          return <li key={i} className='activity-list__item'>
            <div className='activity-list__item__time'>{moment(item.timestamp).format('ddd D MMM')}</div>
            <div className=''>
              <ActivityBar item={item} />
            </div>
          </li>;
          listItems.push(listItem);
        })}
      </ul>
    </div>
  }
}

class ActivityBar extends React.Component {
  barStyle(item, key) {
    const keys = {
      'generic': 'event',
      'session': 'sessionEvent',
      'chat': 'chatMessage'
    }

    var ratios = {
      'generic': ((item.events.event / item.count) * 100).toString(),
      'session': ((item.events.sessionEvent / item.count) * 100).toString(),
      'chat': ((item.events.chatMessage / item.count) * 100).toString(),
    }

    var colours = {
      'generic': '#4CB5FF',
      'session': '#0095FF',
      'chat': '#004A7F'
    }

    var style = {
      height: '100%',
      width: ratios[key] + '%',
      backgroundColor: colours[key]
    }

    return style;
  }

  render() {
    return <div className='bar-wrapper'>
      <div style={this.barStyle(this.props.item, 'chat')}></div>
      <div style={this.barStyle(this.props.item, 'session')}></div>
      <div style={this.barStyle(this.props.item, 'generic')}></div>
    </div>
  }
}

const mountNode = document.getElementById('appWrap');
ReactDOM.render(<App />, mountNode);

console.log("We're in business");
