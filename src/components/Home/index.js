/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'

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

class Home extends Component {
  state = {
    statesList: [],
    apiStatus: apiStatusConstants.initial,
    activeSortId: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getStates()
  }

  getStates = async () => {
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
    console.log(resultList, 'result list')
    this.setState({
      statesList: resultList,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  compareStates = (stateA, stateB) => {
    const nameA = stateA.name.toUpperCase()
    const nameB = stateB.name.toUpperCase()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }

  compareStatesReverse = (stateA, stateB) => {
    const nameA = stateA.name.toUpperCase()
    const nameB = stateB.name.toUpperCase()

    if (nameA < nameB) {
      return 1 // Reverse order
    }
    if (nameA > nameB) {
      return -1 // Reverse order
    }
    return 0
  }

  changeSortId = activeSortId => {
    const {statesList} = this.state
    this.setState()
    const sortedStatesList =
      activeSortId === 0
        ? statesList.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
          )
        : statesList.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          )
    this.setState(prevState => ({
      activeSortId: 1 - prevState.activeSortId,
      statesList: sortedStatesList,
    }))
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = (statesList, data) => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

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
          })
        }
      }
    })
    return resultList
  }

  renderAllProducts = () => {
    const {apiStatus, searchInput, statesList} = this.state
    const totalCases = statesList.reduce(
      (accumulator, currentState) => {
        accumulator.confirmed += currentState.confirmed
        accumulator.deceased += currentState.deceased
        accumulator.recovered += currentState.recovered
        accumulator.active += currentState.active
        return accumulator
      },
      {confirmed: 0, deceased: 0, recovered: 0, active: 0},
    )
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div>
            <Header />
            <div className="hor-card">
              <BsSearch />
              <input
                type="search"
                onChange={this.changeSearchInput}
                value={searchInput}
                placeholder="Enter the State"
              />
            </div>
            {searchInput.length === 0 && (
              <div>
                <div className="hor-card">
                  <div testid="countryWideConfirmedCases">
                    <p>Confirmed</p>
                    <img
                      alt="country wide confirmed cases pic"
                      src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383239/check-mark_1_h9x9vy.png"
                    />
                    <p>{totalCases.confirmed}</p>
                  </div>
                  <div testid="countryWideActiveCases">
                    <p>Active</p>
                    <img
                      alt="country wide active cases pic"
                      src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/protection_1_vb9yi3.png"
                    />
                    <p>{totalCases.active}</p>
                  </div>
                  <div testid="countryWideRecoveredCases">
                    <p>Recovered</p>
                    <img
                      alt="country wide recovered cases pic"
                      src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383323/recovered_1_dtdq2j.png"
                    />
                    <p>{totalCases.recovered}</p>
                  </div>
                  <div testid="countryWideDeceasedCases">
                    <p>Deceased</p>
                    <img
                      alt="country wide deceased cases pic"
                      src="https://res.cloudinary.com/dnnvnrk3i/image/upload/v1705383322/breathing_1_raykzi.png"
                    />
                    <p>{totalCases.deceased}</p>
                  </div>
                </div>
                <div testid="stateWiseCovidDataTable">
                  <ul>
                    <li className="hor-card">
                      <div className="hor-card">
                        <h1>States/UT</h1>
                        <button
                          testid="ascendingSort"
                          type="button"
                          onClick={() => {
                            this.changeSortId(1)
                          }}
                        >
                          <FcGenericSortingAsc alt=" asc sort icon" />
                        </button>
                        <button
                          testid="descendingSort"
                          type="button"
                          onClick={() => {
                            this.changeSortId(0)
                          }}
                        >
                          <FcGenericSortingDesc alt=" desc sort icon" />
                        </button>
                      </div>

                      <p>Confirmed</p>
                      <p>Active</p>
                      <p>Recovered</p>
                      <p>Deceased</p>
                      <p>Population</p>
                    </li>
                    {statesList.map(each => (
                      <li key={each.stateCode}>
                        <p>{each.name}</p>
                        <p>{each.confirmed}</p>
                        <p>{each.active}</p>
                        <p>{each.recovered}</p>
                        <p>{each.deceased}</p>
                        <p>{each.population}</p>
                      </li>
                    ))}
                  </ul>
                  <Footer />
                </div>
              </div>
            )}
            {searchInput.length !== 0 && (
              <ul testid="searchResultsUnorderedList">
                {statesList
                  .filter(each =>
                    each.name.toLowerCase().includes(searchInput.toLowerCase()),
                  )
                  .map(match => (
                    <li key={match.stateCode} className="hor-card">
                      <Link to={`/state/${match.stateCode}`}>
                        <div className="hor-card">
                          <p>{match.name}</p>
                          <div className="hor-card">
                            <p>{match.stateCode}</p>
                            <BiChevronRightSquare />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
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

export default Home
