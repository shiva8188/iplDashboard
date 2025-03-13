import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const filtered = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teams: filtered, isLoading: false})
  }

  getHomeData = () => {
    const {teams} = this.state

    return (
      <Link to="/" className="link">
        <div className="home-container">
          <div className="match-details-container">
            <div className="logo-heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="logo"
              />
              <h1 className="logo-heading">IPL Dashboard</h1>
            </div>
            <ul className="teams-container">
              {teams.map(each => (
                <TeamCard key={each.id} teamItem={each} />
              ))}
            </ul>
          </div>
        </div>
      </Link>
    )
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" className="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.getLoader() : this.getHomeData()
  }
}

export default Home
