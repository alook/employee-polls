import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import store from "../store"

describe('App', () => {

  const renderApp = () => {
    render(<Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>);
  }

  it('app title renders', () => {
    renderApp()
    const titleElement = screen.getByText(/Employee Polls/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('login works', async() => {
    renderApp()
    let loginButton = await screen.findByText("Login");
    fireEvent.click(loginButton)
    const newPollsElement = await screen.findByText(/New polls/i);
    expect(newPollsElement).toBeInTheDocument();
  })

  it('poll detail page is rendered', async() => {
    renderApp()
    let pollLink = await screen.findByText(/mtsamis/i)
    fireEvent.click(pollLink)
    const question = screen.getByText(/Would you rather/i);
    expect(question).toBeInTheDocument();
    const optionOne = screen.getByText(/deploy to production once every two weeks/i);
    expect(optionOne).toBeInTheDocument();
    const optionTwo = screen.getByText(/deploy to production once every month/i);
    expect(optionTwo).toBeInTheDocument();
    let voteButtons = await screen.findAllByText("Vote");
    expect(voteButtons.length).toEqual(2)
  })

  it('result is shown after voting for an option', async() => {
    renderApp()
    let pollLink = await screen.findByText(/mtsamis/i)
    fireEvent.click(pollLink)
    let voteButtons = await screen.findAllByText("Vote");
    fireEvent.click(voteButtons[0])
    const thumbsUpElement = await screen.findByTestId("ThumbUpIcon");
    expect(thumbsUpElement).toBeInTheDocument()
    const result = await screen.findByText(/3 Votes, including you! \(75\.00%\)/i);
    expect(result).toBeInTheDocument()
  })

  it('A new poll can be created', async() => {
    renderApp()
    let addPollLink = await screen.findByText(/Add poll/i)
    fireEvent.click(addPollLink)
    const result = await screen.findByText(/Create your own poll/i);
    expect(result).toBeInTheDocument()
    const inputs = await screen.findAllByRole("textbox")
    const submitButton = await screen.findByText("Submit")
    expect(inputs.length).toEqual(2)
    fireEvent.change(inputs[0], {target: {value: 'Eat pizza'}})
    fireEvent.change(inputs[1], {target: {value: 'Eat salad'}})
    fireEvent.click(submitButton)
    await screen.findByText(/New polls/i)
    await screen.findByText(/Eat pizza/i)
  })
})
