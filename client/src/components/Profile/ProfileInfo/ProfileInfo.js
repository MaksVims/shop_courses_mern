import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import './ProfileInfo.scss'

const ProfileInfo = (props) => {
  return (
    <div className={"more-info"}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Дополнительная информация</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={"content-info"}>
            <ul>
              <li>Курсов создано: </li>
              <li>Приобретено курсов: </li>
              <li>Всего потрачено: </li>
              <li>Отмеченных курсов: </li>
            </ul>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ProfileInfo