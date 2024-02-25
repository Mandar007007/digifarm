import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp,onExpire } : any) {
  const {
    seconds,
    minutes,
    hours,
  } = useTimer({ expiryTimestamp, onExpire: onExpire});


  return (
    <div style={{textAlign: 'center'}}>
      <h1> Time left :  </h1>

      <div className="flex justify-center space-x-4 mt-5">
        
        <div className="p-2 rounded-md  shadow-md transform hover:scale-105 transition-transform duration-300 bg-black  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 w-full">
          <div className="text-4xl font-bold text-green-500">{hours}</div>
          <div className="text-sm text-gray-400 px-2">Hours</div>
        </div>
        <div className="p-2 rounded-md  shadow-md transform hover:scale-105 transition-transform duration-300 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 w-full">
          <div className="text-4xl font-bold text-green-500">{minutes}</div>
          <div className="text-sm text-gray-400 px-1">Minutes</div>
        </div>
        <div className="p-2 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300 bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 w-full">
          <div className="text-4xl font-bold  text-green-500">{seconds}</div>
          <div className="text-sm text-gray-400 px-1">Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default MyTimer