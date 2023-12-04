import { Calendar, dayjsLocalizer } from "react-big-calendar"
import dayjs from "dayjs"
import "dayjs/locale/fi"
import { useEffect, useState } from "react"
import TrainingService from "../services/TrainingService"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography } from "@mui/material"


const localizer = dayjsLocalizer(dayjs)

const TrainingCalendar = (props) => {
    const [trainings, setTrainings] = useState()

    useEffect(() => getTrainingsList(), [])

    const getTrainingsList = () => {
        TrainingService
            .getAll()
            .then(res => formatTrainings(res))
    }

    const formatTrainings = (data) => {
        setTrainings(data.map(training =>
        ({
            id: training.id,
            title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
            start: dayjs(training.date).toDate(),
            end: dayjs(training.data).add(training.duration, "minute").toDate()
        })))

    }

    return (
        <>
            <Typography variant="h5" textAlign="center">Training Calendar</Typography>
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                // showAllEvents
                showMultiDayTimes
                step={60}
                style={{ height: 600 }} />
        </>
    )

}

export default TrainingCalendar