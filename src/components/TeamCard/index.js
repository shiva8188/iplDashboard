import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamItem} = props
  const {id, name, teamImageUrl} = teamItem

  return (
    <Link to={`/team-matches/${id}`} className="link">
      <li className="team-card">
        <img src={teamImageUrl} className="team-img" alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
