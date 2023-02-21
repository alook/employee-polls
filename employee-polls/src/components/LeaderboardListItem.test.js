import { render } from '@testing-library/react'
import React from "react";
import LeaderboardListItem from "./LeaderboardListItem";

describe('LeaderboardListItem', () => {
  it('will match snapshot', async () => {
    const view = await render(<LeaderboardListItem leaderboardUser={{
      id: "userId",
      name: "username",
      avatarURL: "/face1.png",
      numQuestions: 2,
      numAnswers: 3,
      numTotal: 5
    }} />);
    expect(view).toMatchSnapshot()
  })
})