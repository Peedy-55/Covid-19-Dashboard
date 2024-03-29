/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
// import Select from 'react-select'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  inProgress2: 'IN_PROGRESS2',
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
    datesList: [],
    activeSort: 'confirmed',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDistricts()
    this.getStates()
  }

  getDistricts = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress2,
    })

    const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    // console.log(stateCode)
    const response = await fetch(requestUrl, options)
    const data = await response.json()
    const formattedData = Object.entries(data[stateCode].dates).map(
      ([date, details]) => ({
        date,
        confirmed: details.total.confirmed,
        recovered: details.total.recovered,
        active:
          details.total.confirmed -
          (details.total.recovered + details.total.deceased),
        tested: details.total.tested,
        deceased: details.total.deceased,
      }),
    )

    // console.log(formattedData)
    this.setState(() => ({
      datesList: formattedData,
    }))
    // keyNames.forEach(date => {
    //   console.log('date: ', date)
    //   console.log('confirmed:', data[stateCode].dates[date].total.confirmed)
    //   console.log('deceased:', data[stateCode].dates[date].total.deceased)
    //   console.log('recovered:', data[stateCode].dates[date].total.recovered)
    //   console.log('tested:', data[stateCode].dates[date].total.tested)
    // })
  }

  getStates = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()

    // console.log(data, 'data')
    const resultList = this.convertObjectsDataIntoListItemsUsingForInMethod(
      stateCodes,
      data,
    )
    // console.log(resultList, 'stateCovidDetails')
    const requiredResult = resultList.find(each => each.stateCode === stateCode)
    // console.log(requiredResult, 'requiredList')
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
    <div testid="stateDetailsLoader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderLoadingView2 = () => (
    <div testid="timelinesDataLoader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  convertObjectsDataIntoListItemsUsingForInMethod = (statesList, data) => {
    const resultList = []

    const keyNames = Object.keys(data)
    console.log(data.dates)
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

  onChangeActiveSort = sort => {
    this.setState({activeSort: sort})
  }

  compareDistrictsReverse = (stateA, stateB) => {
    const {activeSort} = this.state
    const nameA = stateA.total[activeSort]
    const nameB = stateB.total[activeSort]

    if (nameA < nameB) {
      return 1 // Reverse order
    }
    if (nameA > nameB) {
      return -1 // Reverse order
    }
    return 0
  }

  renderAllProducts = () => {
    const {apiStatus, activeSort, datesList, statesList} = this.state
    const {districts} = statesList
    // console.log(datesList, datesList.slice(datesList.length - 10), 'last 10')
    // console.log(districts)
    const districtArray =
      districts !== undefined
        ? Object.entries(districts).map(([districtName, districtData]) => ({
            name: districtName,
            ...districtData,
            total: {
              ...districtData.total,
              active: Number.isNaN(
                districtData.total.confirmed -
                  (districtData.total.recovered + districtData.total.deceased),
              )
                ? 0
                : districtData.total.confirmed -
                  (districtData.total.recovered + districtData.total.deceased),
            },
          }))
        : []
    const sortedDistrictsList =
      statesList.districts !== undefined
        ? districtArray.sort(this.compareDistrictsReverse)
        : []
    // console.log(statesList, 'statesList')
    // console.log(sortedDistrictsList)
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

            <div className="hor-card">
              <button
                type="button"
                onClick={() => this.onChangeActiveSort('confirmed')}
              >
                <div testid="stateSpecificConfirmedCasesContainer">
                  <p>Confirmed</p>
                  <img
                    alt="state specific confirmed cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383239/check-mark_1_h9x9vy.png"
                  />
                  <p>{statesList.confirmed}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => this.onChangeActiveSort('active')}
              >
                <div testid="stateSpecificActiveCasesContainer">
                  <p>Active</p>
                  <img
                    alt="state specific active cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/protection_1_vb9yi3.png"
                  />
                  <p>{statesList.active}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => this.onChangeActiveSort('recovered')}
              >
                <div testid="stateSpecificRecoveredCasesContainer">
                  <p>Recovered</p>
                  <img
                    alt="state specific recovered cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/recovered_1_dtdq2j.png"
                  />
                  <p>{statesList.recovered}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => this.onChangeActiveSort('deceased')}
              >
                <div testid="stateSpecificDeceasedCasesContainer">
                  <p>Deceased</p>
                  <img
                    alt="state specific deceased cases pic"
                    src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383322/breathing_1_raykzi.png"
                  />
                  <p>{statesList.deceased}</p>
                </div>
              </button>
            </div>
            <div testid="lineChartsContainer">
              <h1>Top Districts</h1>
              <ul testid="topDistrictsUnorderedList">
                {Object.entries(sortedDistrictsList).map(
                  ([districtName, districtData]) => (
                    <li className="hor-card" key={districtName}>
                      <p>{districtData.total[activeSort]}</p>
                      <p>{districtData.name}</p>
                    </li>
                  ),
                )}
              </ul>
              <div>
                <h1>Bar Chart</h1>
                <div>
                  <BarChart
                    width={800}
                    height={450}
                    data={datesList.slice(datesList.length - 10)}
                  >
                    <CartesianGrid strokeDasharray="" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={activeSort}
                      fill="#8884d8"
                      className="bar"
                      label={{position: 'top', color: 'white'}}
                    />
                  </BarChart>
                  <div>
                    {/* <h1>Top Districts</h1>
                  <h1>Daily Spread Trends</h1> */}
                    {[
                      'confirmed',
                      'active',
                      'recovered',
                      'deceased',
                      'tested',
                    ].map(each => (
                      <LineChart
                        key={each}
                        width={730}
                        height={250}
                        data={datesList}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={each} stroke="#8884d8" />
                      </LineChart>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
      case apiStatusConstants.inProgress2:
        return this.renderLoadingView2()
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
