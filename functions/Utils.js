const formatHours = (hours, abbreviated=false) => {
    const hUnits = abbreviated ? (hours === 1 ? 'hr' : 'hrs') : (hours === 1 ? 'hour' : 'hours')
    return `${hours} ${hUnits}`
}

const formatMinutes = (minutes, abbreviated=false) => {
    const mUnits = abbreviated ? (minutes === 1 ? 'min' : 'mins') : (minutes === 1 ? 'minute' : 'minutes')
    return `${minutes} ${mUnits}`
}

const formatTime = (hours, minutes, abbreviated=false) => {
    const hString = formatHours(hours, abbreviated)
    const mString = formatMinutes(minutes, abbreviated)
    if (hours === 0 && minutes === 0)
        return '---'
    else if (hours === 0)
        return mString
    else if (hours > 0 && minutes === 0)
        return hString
    else
        return hString + ' ' + mString
}

export { formatHours, formatMinutes, formatTime }