import React, { FC } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';

const ConfirmRequestPage: FC<RouteComponentProps<
  {},
  StaticContext,
  { email: string }
>> = (props) => {
  return (
    <main>
      <p>
        Your account has been created. Please check your inbox for confirmation
        link at: {props.location.state.email}
      </p>
    </main>
  );
};

export default ConfirmRequestPage;
