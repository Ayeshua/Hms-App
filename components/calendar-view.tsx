import { memo } from 'react';
import { Dimensions } from 'react-native';
import {Calendar} from 'react-native-calendars';
import { colors } from '../theme/colors';

const {height}=Dimensions.get('screen')
const CalendarView = ({calendarData,isSpinner,onCalendarEvent,currentDate}) => {
  
  console.log('currentDate ',currentDate);
  
  return(
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
      current={currentDate}
      // Callback that gets called when the user selects a day
      onDayPress={({timestamp}) => {
        console.log('selected timestamp', timestamp);
        onCalendarEvent(timestamp,true)
      }}
      
      disableAllTouchEventsForInactiveDays
      // Mark specific dates as marked
      onMonthChange={({timestamp}) => {
        
        onCalendarEvent(timestamp)

      }}
    />
  )}

export default memo(CalendarView)