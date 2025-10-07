import SongDetails from "./SongDetails";

const ExpandableRow = ({ song, isExpanded, onToggle }) => {
  return (
    <>
      <tr onClick={onToggle} style={{ cursor: "pointer" }}>
        <td>{song.id}</td>
        <td className="fw-semibold">{song.title}</td>
        <td>{song.artist}</td>
        <td>
          {song.album === "Single" ? (
            <span className="badge bg-warning text-dark">Single</span>
          ) : (
            song.album
          )}
        </td>
        <td>
          <span className="badge bg-light text-dark border">{song.genre}</span>
        </td>
        <td className="text-danger fw-bold">❤️ {song.likes}</td>
        <td className="text-muted">{song.duration}</td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="7" className="p-0 border-top-0">
            <SongDetails song={song} />
          </td>
        </tr>
      )}
    </>
  );
};

export default ExpandableRow;
