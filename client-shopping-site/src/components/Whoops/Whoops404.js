import { useLocation } from 'react-router';

export default function Whoops404() {
  let location = useLocation();

  return (
    <div className="flex justify-center">
      <h1 className="text-3xl font-bold">
        Resource Not Found at {location.pathname}!
      </h1>
    </div>
  );
}
