import {connect} from "react-redux";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PollListItem from "./PollListItem";

const Polls = (props) => {

  function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
          {value === index && (
              <Box sx={{p: 3}}>
                {children}
              </Box>
          )}
        </div>
    );
  }

  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTab = (event, index) => {
    setTabIndex(index);
  };

  return (
      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="Questions">
            <Tab label="New polls" {...tabProps(0)} />
            <Tab label="Answered polls" {...tabProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {props.newQuestionIds.map((id) => (
                <PollListItem key={id} id={id}/>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {props.answeredQuestionIds.map((id) => (
                <PollListItem key={id} id={id}/>
            ))}
          </List>
        </TabPanel>
      </Box>
  );
};

const mapStateToProps = ({authedUser, questions, users}) => {
  return {
    newQuestionIds: Object.values(questions)
        .sort((q1, q2) => (q2.timestamp - q1.timestamp))
        .filter(question => !Object.keys(users[authedUser].answers).includes(question.id))
        .map(question => question.id),
    answeredQuestionIds: Object.values(questions)
        .sort((q1, q2) => (q2.timestamp - q1.timestamp))
        .filter(question => Object.keys(users[authedUser].answers).includes(question.id))
        .map(question => question.id)
  }
};

export default connect(mapStateToProps)(Polls);