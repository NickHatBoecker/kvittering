import { flip, is, pipe, propOr, sort, toUpper, when } from 'ramda'
import { format } from 'date-fns'

export const sortItems = (items, sortBy) => {
    const [propName, sortOrder = 'asc'] = sortBy.split('_')
    const ascending = sortOrder === 'asc'
    const isTimestamp = ['updated'].includes(propName)

    const getSortValue = pipe(
        propOr(null, propName),
        when(is(String), toUpper),
    )

    const sortFuncAscending = (a, b) => {
        let valA = getSortValue(a)
        let valB = getSortValue(b)

        if (isTimestamp) {
            valA = parseInt(format(new Date(valA), 'T'))
            valB = parseInt(format(new Date(valB), 'T'))
        }

        if (is(String, valA) && is(String, valB)) {
            return valA.localeCompare(valB)
        }

        if (valA === valB) return 0

        return valA < valB ? -1 : 1
    }

    return sort((ascending ? sortFuncAscending : flip(sortFuncAscending)), items)
}
