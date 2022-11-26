import { FC } from 'react';

const ConfirmRequestPage: FC<any> = ({ location }) => (
  <main>
    <p>
      Your account has been created. Please check your inbox for confirmation
      link at: {location.state.email}
    </p>
  </main>
);

export default ConfirmRequestPage;
