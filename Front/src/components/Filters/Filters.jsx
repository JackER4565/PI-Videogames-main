
function Filters({genres}) {

  return (
    <div>
    <select>
        <option value="all">All</option>
        <option value="api">API</option>
        <option value="db">DB</option>
    </select>
    {genres ? genres.map((genre,i) => (
        <select key={genre.id}>
            {i === 0 && <option value="all">All</option>}
            <option value={genre.name}>{genre.name}</option>
        </select>
    )) : ''}
    </div>
  )
}

export default Filters