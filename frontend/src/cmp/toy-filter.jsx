import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterBy] = useState(filterBy)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'range') ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="toy-filter">
            <input type="text" name="name" id="name" value={filterByToEdit.name} onChange={handleChange} placeholder="By Name" />
            <label>
                <input type="radio"
                    name='inStock'
                    value=''
                    checked={filterByToEdit.inStock === ''}
                    onChange={handleChange}
                />
                All Toys
            </label>
            <label>
                <input type="radio"
                    name='inStock'
                    value='forSale'
                    checked={filterByToEdit.inStock === 'forSale'}
                    onChange={handleChange}
                />
                For Sale
            </label>
        </section>
    )
}