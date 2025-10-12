import './SearchBar.css'

const SearchBar = ({ searchTerm, onSearchChange, filterType, onFilterChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Поиск мероприятий..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">Все типы</option>
        <option value="concert">Концерты</option>
        <option value="conference">Конференции</option>
        <option value="fair">Ярмарки</option>
        <option value="exhibition">Выставки</option>
      </select>
    </div>
  )
}

export default SearchBar