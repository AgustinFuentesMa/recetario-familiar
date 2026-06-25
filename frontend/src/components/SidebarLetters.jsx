const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function SidebarLetters({ onSelect }) {
  return (
    <div className="sidebar">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelect(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default SidebarLetters;