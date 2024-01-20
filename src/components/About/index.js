/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    faqsList: [],
  }

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()
    console.log(data)
    this.setState({
      faqsList: data.faq,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div testid="aboutRouteLoader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus, faqsList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div>
            <Header />
            <div>
              <h1>About</h1>
              <p>Last update on march 28th 2021.</p>
              <h1>COVID-19 vaccines be ready for distribution</h1>
              <ul testid="faqsUnorderedList">
                {faqsList.map(each => (
                  <li key={each.qno}>
                    <p>{each.question}</p>
                    <p>{each.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
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

export default About
