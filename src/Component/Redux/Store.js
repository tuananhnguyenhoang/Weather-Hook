import { createContext } from "react";
import { useReducer } from "react";

function WeatherSearch(state, { type, payload }) {
    switch (type) {
        case "GetWeatherSearch":
            return { ...state, lsWeatherSearch: payload }
        case "Resetnull":
            return { ...state, lsnull: payload }
        case "Keynull":
            return { ...state, lskey: payload }
        default:
            return state
    }
}
function WeatherDay(state, { type, payload }) {
    switch (type) {
        case "GetLatLon":
            return { ...state, lsLatLon: payload }
        case "GetWeatherDay":
            return { ...state, lsWeatherDay: payload }
        default:
            return state
    }
}
function DayDetail(state, { type, payload }) {
    switch (type) {
        case "GetDay":
            return { ...state, dayItem: payload }
        default:
            return state
    }
}



//biến đại diện global state
export const StoreContext = createContext(null);

const Store = ({ children }) => {
    const [lsWeatherSearch, Dispatch] = useReducer(WeatherSearch, [])
    const [lsnull, Dispatchnull] = useReducer(WeatherSearch, "")
    const [lskey, DispatchKeySearch] = useReducer(WeatherSearch,"")
    const [lsLatLon, DispatchLatLon] = useReducer(WeatherDay, [])
    const [lsWeatherDay, DispatchDay] = useReducer(WeatherDay, [])
    const [dayItem, DispatchDayDetail] = useReducer(DayDetail, [])
    const globalState = {
        weatherSearch: lsWeatherSearch,
        abc: Dispatch,
        weatherNull: lsnull,
        nullFunc: Dispatchnull,
        keySearch:lskey,
        Keyfun:DispatchKeySearch,
        latlon: lsLatLon,
        latlonfun: DispatchLatLon,
        lsDay: lsWeatherDay,
        DayFunc: DispatchDay,
        lsDayDetail: dayItem,
        DayDetailFunc: DispatchDayDetail
    }

    return <StoreContext.Provider value={globalState}>
        {children}
    </StoreContext.Provider>;
}

export default Store