import React from 'react';
import ReactDOM from 'react-dom';
import { campaignData } from './data.js';
import { formatCurrency, formatPercent, formatQuantity, formatAgo } from './utility.js';

class DonateButton extends React.Component {
  render () {
    return <button className='donate-button' onClick={this.props.donate}>
      Donate
    </button>
  }
}

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerBStyle: {
        width: '0%',
        height: '100%',
        backgroundColor: '#F58220',
        transition: 'all .2s ease-in-out'
      }
    }
  }

  raiseBar() {
    var changeState = this.state.innerBStyle;

    if (changeState.width === '0%'){
      changeState.width = formatPercent(this.props.data.goal, this.props.data.current);
      this.setState({ innerBStyle: changeState });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.raiseBar();
    }, 300)
  }

  render () {
    return <div className='progress-bar'>
      <div style={this.state.innerBStyle} class='progress-bar__inner'></div>
    </div>
  }
}

class DonateBar extends React.Component {
  donate() {
    console.log('Donate!');
  }

  render() {
    return <div className='donate-bar'>
      <DonateButton donate={this.donate} />
      <div className='donate-bar__info'>
        <h1 className='donate-bar__info__total'><span className='donate-bar__info__total__figure'>{formatCurrency(this.props.data.stats.current, this.props.data.meta.currency)}</span> raised</h1>
        <ProgressBar data={this.props.data.stats} />
        <h2 className='donate-bar__info__goal'>of <span className='donate-bar__info__goal__figure'>{formatCurrency(this.props.data.stats.goal, this.props.data.meta.currency)}</span> goal</h2>
        <div className='donate-bar__info__percentage'>{formatPercent(this.props.data.stats.goal, this.props.data.stats.current)}</div>
      </div>
    </div>
  }
}

class BenefactorList extends React.Component {
  render() {
    return <ul className='benefactor-list'>
      {this.props.data.donations.map(function(donation) {

        return <li key={donation.donation.id} className='donation-item'>
          <img className='donation-item__image' src={donation.user.image} alt={donation.user.username} />
          <div className='donation-item__info'>
            <span className='donation-item__info__name'>{donation.user.name}</span> donated {formatQuantity(donation.donation.quantity)} {formatAgo(donation.donation.time)}
          </div>
        </li>
      })}
    </ul>
  }
}

class DonationWidget extends React.Component {
  render() {
    return <div className='donation-widget'>
      <DonateBar data={this.props.data} />
      <BenefactorList data={this.props.data} />
    </div>;
  }
}

ReactDOM.render(<DonationWidget data={campaignData} />, document.getElementById('donationWidget'));
