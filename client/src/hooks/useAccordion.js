import React, { useState} from 'react'
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

export function useAccordion(options = [], show = true) {
	const [expanded, setExpanded] = useState(false)

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const body = !show ? null : options.map(config => {
		return (
			<ExpansionPanel
				key={config.title}
				onChange={handleChange(`${config.title}`)}
				expanded={expanded === `${config.title}`}
			>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon/>}
					aria-controls={`panel1a-header-${config.title}`}
					id={`panel1a-header-${config.title}`}
				>
					<Typography>{config.title}</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography className={"content-info"} component={"div"}>
						{config.body ? config.body :
							<ul>
								{config.items.map(item => (
									<li key={item}>
										{item}
									</li>
								))}
							</ul>
						}
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		)
	})
	return body
}

