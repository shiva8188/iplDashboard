import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    venue,
    firstInnings,
    competingTeam,
    date,
    result,
    teamLogo,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails
  return (
    <div className="latestTeamDetails">
      <div className="latestData-top">
        <div className="latestData">
          <p className="teamName">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="result">{result}</p>
        </div>
        <img
          src={teamLogo}
          alt={`latest match ${competingTeam}`}
          className="firstInnings-image"
        />
      </div>
      <hr />
      <div className="latestData-bottom">
        <p className="headings">First Innings</p>
        <p className="answers">{firstInnings}</p>
        <p className="headings">Second Innings</p>
        <p className="answers">{secondInnings}</p>
        <p className="headings">ManOfTheMatch</p>
        <p className="answers">{manOfTheMatch}</p>
        <p className="headings">Umpires</p>
        <p className="answers">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
