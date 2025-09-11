import { google } from 'googleapis';

export async function handler(event: any, context: any) {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const calendar = initializeCalendar();
    const sanityEventData = JSON.parse(event.body || '{}');
    const sanityOperation = event.headers['sanity-operation'] || 'create';

    try {
      return await handleOperation(calendar, calendarId, sanityEventData, sanityOperation);
    } catch (error) {
      console.error('Error processing calendar event:', error);
      return errorResponse(500, 'Failed to process calendar event', error);
    }
  } catch (error) {
    console.error('General error:', error);
    return errorResponse(500, 'Server error', error);
  }
}

function initializeCalendar() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  const private_key = process.env.GOOGLE_PRIVATE_KEY;

  if (!client_email || !private_key) {
    throw new Error('Google service account credentials are not set in environment variables');
  }

  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ['https://www.googleapis.com/auth/calendar']
  });

  return google.calendar({ version: 'v3', auth });
}

async function handleOperation(calendar: any, calendarId: string, sanityEventData: any, operation: string) {
  if ((operation === 'delete' || operation === 'update') && !sanityEventData._id) {
    return errorResponse(400, `Sanity ID is required for ${operation} operation`);
  }

  if (operation === 'delete') {
    const listResponse = await calendar.events.list({
      calendarId,
      privateExtendedProperty: `sanityId=${sanityEventData._id}`
    });
    
    if (!(listResponse.data.items?.length)) {
      return errorResponse(404, 'Event not found in Google Calendar');
    }
    
    await calendar.events.delete({ 
      calendarId, 
      eventId: listResponse.data.items[0].id 
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Event deleted successfully',
        sanityId: sanityEventData._id
      })
    };
  }

  if (!sanityEventData.startDate) {
    return errorResponse(400, 'Start date is required');
  }
  
  try {
    new Date(sanityEventData.startDate);
    if (sanityEventData.endDate) new Date(sanityEventData.endDate);
  } catch (e) {
    return errorResponse(400, 'Invalid date format');
  }
  
  const descriptionText = parseDescriptionText(sanityEventData.description);
  const { startDate, endDate } = calculateEventDates(sanityEventData);

  if (operation === 'update') {
    const listResponse = await calendar.events.list({
      calendarId,
      privateExtendedProperty: `sanityId=${sanityEventData._id}`
    });
    
    if (!(listResponse.data.items?.length)) {
      return errorResponse(404, 'Event not found in Google Calendar for update');
    }
    
    const eventId = listResponse.data.items[0].id;
    const existingEvent = listResponse.data.items[0];
    
    const updateResponse = await calendar.events.update({
      calendarId, 
      eventId,
      requestBody: {
        summary: sanityEventData.title || existingEvent.summary,
        description: descriptionText || existingEvent.description,
        start: { dateTime: startDate.toISOString(), timeZone: 'America/New_York' },
        end: { dateTime: endDate.toISOString(), timeZone: 'America/New_York' },
        extendedProperties: { private: { sanityId: sanityEventData._id } }
      }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Event updated successfully',
        event: updateResponse.data
      })
    };
  }

  const response = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: sanityEventData.title,
      description: descriptionText,
      start: { dateTime: startDate.toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: endDate.toISOString(), timeZone: 'America/New_York' },
      extendedProperties: { private: { sanityId: sanityEventData._id } }
    }
  });
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Event created successfully',
      event: response.data
    })
  };
}

function parseDescriptionText(description: any[]): string {
  if (!description || !Array.isArray(description)) return '';
  
  return description
    .map(block => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children
          .filter(child => child._type === 'span')
          .map(span => span.text)
          .join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

function calculateEventDates(eventData: any) {
  const startDate = new Date(eventData.startDate);
  const endDate = eventData.endDate ? 
    new Date(eventData.endDate) : 
    (() => {
      const date = new Date(startDate);
      date.setHours(date.getHours() + 1);
      return date;
    })();
    
  return { startDate, endDate };
}

function errorResponse(statusCode: number, message: string, error?: any) {
  return {
    statusCode,
    body: JSON.stringify({ 
      error: message,
      message: error ? ((error instanceof Error) ? error.message : String(error)) : undefined
    })
  };
}