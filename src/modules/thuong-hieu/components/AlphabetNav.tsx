export default function AlphabetNav({
  sortedLetters,
}: {
  sortedLetters: string[];
}) {
  if (sortedLetters.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {sortedLetters.map((letter) => (
        <a
          key={letter}
          href={`#${letter}`}
          className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors text-sm font-medium"
        >
          {letter}
        </a>
      ))}
    </div>
  );
}
