import React, { useState, ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AboutSection from './AboutSection';
import PhotosSection from './PhotosSection';
import AccountSection from './AccountSection';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2)
  },
  panelDetails: {
    margin: theme.spacing(0, 3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})
);

function SettingsPage() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>('panel3');

  const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const components = [
    {
      panel: 'panel1',
      heading: 'About me',
      secondaryHeading: 'Let us know more about you',
      component: <AboutSection />
    },
    {
      panel: 'panel2',
      heading: 'My photos',
      secondaryHeading: 'Upload and manage your photos',
      component: <PhotosSection />
    },
    {
      panel: 'panel3',
      heading: 'My account',
      secondaryHeading: 'Update your account info',
      component: <AccountSection />
    }
  ];

  return (
    <div className={classes.root}>
      {components.map(cmp => (
        <ExpansionPanel
          key={cmp.panel}
          expanded={expanded === cmp.panel}
          onChange={handleChange(cmp.panel)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${cmp.panel}bh-content`}
            id={`${cmp.panel}bh-header`}
          >
            <Typography className={classes.heading}>{cmp.heading}</Typography>
            <Typography className={classes.secondaryHeading}>{cmp.secondaryHeading}</Typography>
          </ExpansionPanelSummary>
          <div className={classes.panelDetails}>{cmp.component}</div>
        </ExpansionPanel>
      ))}
    </div>
  );
}

export default SettingsPage;
