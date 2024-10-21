import React from 'react';
import WorkTogether from './Worktogether';

const HomePage: React.FC = () => {
  return (
    <main>
      <WorkTogether
        title="Lets work together"
        description="You want to beat your competitors in every way possible in terms of technology and design by using one over services? Feel free to reach out to us or directly make an appointment with one of our team members."
      />
    </main>
  );
};

export default HomePage;