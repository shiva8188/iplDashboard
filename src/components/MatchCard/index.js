import './index.css'

const MatchCard = props => {
  const {matchcardDetails} = props
  const {status, teamLogo, team, result} = matchcardDetails

  return (
    <li className="matchList">
      <img src={teamLogo} alt={`competing team ${team}`} className="matchImg" />
      <p className="match-heading">{team}</p>
      <p className="match-result">{result}</p>
      <p className={status}>{status}</p>
    </li>
  )
}

export default MatchCard
