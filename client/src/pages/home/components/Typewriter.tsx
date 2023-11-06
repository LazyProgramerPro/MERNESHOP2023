// Import thư viện
import { Typewriter } from 'react-simple-typewriter'

// Component sử dụng
const MyTypewriterComponent: React.FC = () => {
  return (
    <Typewriter
    words={['Eat', 'Sleep', 'Code', 'Repeat!']}
    loop={5}
    cursor
    cursorStyle='_'
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1000}

  />
  );
};

export default MyTypewriterComponent;