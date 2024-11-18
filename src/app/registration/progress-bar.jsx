const Dot = ({ progress, position }) => {
  const getColor = (position) => {
    return progress > position ? 'bg-yellow-mid' : 'bg-grey';
  };

  return (
    <div className={`w-12 h-12 rounded-full transition-colors duration-600 delay-200 ${getColor(position)}`} />
  );
};

const Line = ({ progress, position }) => {
  const getLineColor = (position) => {
    return progress >= position ? 'bg-yellow-mid' : 'bg-grey';
  };

  const getLineWidth = (position) => {
    return progress > position ? 'w-full' : 'w-0';
  };

  return (
    <div className="h-1 flex-1 bg-grey relative overflow-hidden">
      <div className={`absolute h-full ${getLineWidth(position)} ${getLineColor(position)} transition-all duration-600`} />
    </div>
  );
};

export default function ProgressBar({ progress }) {
  return (
    <div className="flex justify-center items-center w-auto relative sm:mx-40 md:mx-64">
      <Dot progress={progress} position={0} />
      <Line progress={progress} position={1} />
      <Dot progress={progress} position={1} />
      <Line progress={progress} position={2} />
      <Dot progress={progress} position={2} />
    </div>
  );
}