import {useState} from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleAddQuestion} from "../actions/questions";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";

const AddPoll = ({dispatch}) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleOptionOneChange = (e) => {
    const text = e.target.value;
    setOptionOne(text);
  };

  const handleOptionTwoChange = (e) => {
    const text = e.target.value;
    setOptionTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
      <Box justifyContent="center" alignItems="center" textAlign="center">
        <h2>Create your own poll</h2>
        <h1>Would you rather</h1>
        <Box>
          <form className="new-question" onSubmit={handleSubmit}>
            <FormControl>
              <Box width={500}>
                <TextField fullWidth id="optionOne" label="First Option" variant="outlined" value={optionOne}
                           onChange={handleOptionOneChange} inputProps={{ maxLength: 180 }} />
                <p>or</p>
                <TextField fullWidth id="optionTwo" label="Second Option" variant="outlined" value={optionTwo}
                           onChange={handleOptionTwoChange} inputProps={{ maxLength: 180 }}
                           error={optionOne === optionTwo && optionOne.trim() !== ""}
                           helperText="Please enter two different options."/>
                <p/>
                <Button m={2} variant="contained" type="submit"
                        disabled={optionOne.trim() === "" || optionTwo.trim() === "" || optionOne === optionTwo }>Submit</Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
  );
};

export default connect()(AddPoll);