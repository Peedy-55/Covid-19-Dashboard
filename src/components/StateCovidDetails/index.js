/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Select from 'react-select'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const stateCodes = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateCovidDetails extends Component {
  state = {
    statesList: [],
    activeSort: 'confirmed',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStates()
    this.getDistricts()
  }

  getDistricts = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    // console.log(id)
    fetch(requestUrl, options)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)

        const keyNames = Object.keys(jsonData[id].dates)

        // keyNames.forEach(date => {
        //   console.log('date: ', date)
        //   console.log('confirmed:', jsonData[id].dates[date].total.confirmed)
        //   console.log('deceased:', jsonData[id].dates[date].total.deceased)
        //   console.log('recovered:', jsonData[id].dates[date].total.recovered)
        //   console.log('tested:', jsonData[id].dates[date].total.tested)
        // })
      })
  }

  getStates = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()

    console.log(data, 'data')
    const resultList = this.convertObjectsDataIntoListItemsUsingForInMethod(
      stateCodes,
      data,
    )
    // console.log(resultList, 'stateCovidDetails')
    const requiredResult = resultList.find(each => each.stateCode === id)
    console.log(requiredResult)
    this.setState({
      statesList: requiredResult,
      apiStatus: apiStatusConstants.success,
    })
  }

  formatDate = dateString => {
    const options = {month: 'long', day: 'numeric', year: 'numeric'}
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  convertObjectsDataIntoListItemsUsingForInMethod = (statesList, data) => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total, districts, meta} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const matchingState = statesList.find(
          state => state.state_code === keyName,
        )

        if (matchingState) {
          resultList.push({
            stateCode: keyName,
            name: matchingState.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
            districts,
            meta,
          })
        }
      }
    })
    return resultList
  }

  onChangeActiveSort = event => {
    this.setState({activeSort: event.target.value})
  }

  renderAllProducts = () => {
    const {apiStatus, activeSort, statesList} = this.state
    console.log(statesList, 'statesList')
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div>
            <Header />
            <div className="hor-card">
              <div>
                <h1>{statesList.name}</h1>
                <p>{this.formatDate(statesList.meta.last_updated)}</p>
              </div>
              <div>
                <p>Tested</p>
                <p>{statesList.tested}</p>
              </div>
            </div>

            <select
              className="hor-card"
              value={activeSort}
              onChange={this.onChangeActiveSort}
            >
              <option value="confirmed">
                <div testid="countryWideConfirmedCases">
                  <p>Confirmed</p>
                  <img
                    alt="country wide confirmed cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383239/check-mark_1_h9x9vy.png"
                  />
                  <p>{statesList.confirmed}</p>
                </div>
              </option>
              <option value="active">
                <div testid="countryWideActiveCases">
                  <p>Active</p>
                  <img
                    alt="country wide active cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/protection_1_vb9yi3.png"
                  />
                  <p>{statesList.active}</p>
                </div>
              </option>
              <option value="recovered">
                <div testid="countryWideRecoveredCases">
                  <p>Recovered</p>
                  <img
                    alt="country wide recovered cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/recovered_1_dtdq2j.png"
                  />
                  <p>{statesList.recovered}</p>
                </div>
              </option>
              <option value="deceased">
                <div testid="countryWideDeceasedCases">
                  <p>Deceased</p>
                  <img
                    alt="country wide deceased cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383322/breathing_1_raykzi.png"
                  />
                  <p>{statesList.deceased}</p>
                </div>
              </option>
            </select>

            <Footer />
          </div>
        )
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-products-section">{this.renderAllProducts()}</div>
    )
  }
}

export default StateCovidDetails
