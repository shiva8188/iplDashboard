import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    teamBanner: '',
    newId: '',
    latestMatch: {},
    matchCard: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchesData()
  }

  getMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const bannerUrl = data.team_banner_url
    const latestFiltered = {
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      id: data.latest_match_details.id,
      result: data.latest_match_details.result,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      date: data.latest_match_details.date,
      teamLogo: data.latest_match_details.competing_team_logo,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
    }

    const matchCardData = data.recent_matches.map(each => ({
      id: each.id,
      team: each.competing_team,
      teamLogo: each.competing_team_logo,
      status: each.match_status,
      result: each.result,
    }))

    this.setState({
      teamBanner: bannerUrl,
      newId: id,
      latestMatch: latestFiltered,
      matchCard: matchCardData,
      isLoading: false,
    })
  }

  getTeamMatchesResult = () => {
    const {teamBanner, latestMatch, matchCard, newId} = this.state
    const stats = {
      wins: matchCard.filter(match => match.status === 'Won').length,
      losses: matchCard.filter(match => match.status === 'Lost').length,
      draws: matchCard.filter(match => match.status === 'Draw').length,
    }

    const data = [
      {name: 'Wins', value: stats.wins},
      {name: 'Losses', value: stats.losses},
      {name: 'Draws', value: stats.draws},
    ]

    const colors = ['#0088FE', '#FF8042', '#00C49F']

    return (
      <div className={`teamMatches-container ${newId}`}>
        <Link to="/" className="link">
          <button type="button" className={`back-button ${newId}`}>
            Back
          </button>
        </Link>
        <div className="result-container">
          <img src={teamBanner} alt="team banner" className="banner" />
          <div className="latestMatch-container">
            <p className="latestMatches-heading">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatch} />
            <ul className="matchCard-container">
              {matchCard.map(each => (
                <MatchCard key={each.id} matchcardDetails={each} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="statistics-heading">Statistics</h1>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((a, index) => (
                  <Cell
                    key={`cell-${index + a.length}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    )
  }

  getSpinner = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" className="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.getSpinner() : this.getTeamMatchesResult()
  }
}

export default TeamMatches
