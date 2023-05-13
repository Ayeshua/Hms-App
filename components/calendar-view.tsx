import { memo } from 'react';
import { Dimensions } from 'react-native';
import {Calendar} from 'react-native-calendars';
import { colors } from '../theme/colors';

const {height}=Dimensions.get('screen')
const CalendarView = ({calendarData,isSpinner,onCalendarEvent}) => {
    //console.log('current ',current);
    
  return (
    <Calendar
      // Customize the appearance of the calendar
      style={{
        borderWidth: 1,
        borderColor: colors.silver,
        height: height/2
      }}
      enableSwipeMonths
      markingType={'multi-dot'}
      displayLoadingIndicator={isSpinner}
      {...calendarData}
      // Callback that gets called when the user selects a day
      onDayPress={({timestamp}) => {
        console.log('selected timestamp', timestamp);
        onCalendarEvent(timestamp,true)
      }}
      disableAllTouchEventsForInactiveDays
      // Mark specific dates as marked
      onMonthChange={({timestamp}) => {
        console.log('month changed', timestamp);
        onCalendarEvent(timestamp)

      }}
    />
  )
}

export default memo(CalendarView)