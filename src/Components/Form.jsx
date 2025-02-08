
export default function Form(props) {
    return (
        <form action={props.search} className="searchForm">
            <input
              type="text"
              placeholder="e.g. Imagine Dragons"
              aria-label="Search interpret or song"
              name="search"
            />
            <button>Search</button>
        </form>
    )
}