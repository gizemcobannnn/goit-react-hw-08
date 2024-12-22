import Styles from "./SearchBox.module.css"
import { useDispatch,useSelector } from 'react-redux';
import { selectNameFilter } from "../redux/filters/selectors.js";
import { setFilter } from "../redux/filters/slice.js";

const SearchBox = () => {

  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);



  function handleFilterChange(e){
    dispatch(setFilter(e.target.value.trim()));
  }

  return (
    <div className='SearchBox'>
        <p className={Styles["find-contact"]}>Find contacts by name</p>
        <input type="text" className="search-input"  value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

export default SearchBox;