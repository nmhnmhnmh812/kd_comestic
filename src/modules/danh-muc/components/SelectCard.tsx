export default function SelectCard({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      className={`h-10 border border-solid border-gray-300 rounded-lg py-2 px-4 text-center cursor-pointer bg-white text-gray-400 hover:border-blue-400 transition-all duration-300 ${
        active ? "bg-blue-400 text-white" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}
