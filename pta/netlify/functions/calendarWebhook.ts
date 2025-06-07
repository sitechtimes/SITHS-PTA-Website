export async function handler(event: any, context: any) {
  const calendarId = '6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com';
  const apiKey = 'AIzaSyDVFq2-peB2fQA3Oiezt-ihZqzII49pWAU';
  const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`;

  if (event.httpMethod === 'GET') {
    try {
      const url = `${baseUrl}/events?key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Calendar API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=600'
        },
        body: JSON.stringify(data)
      };
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to fetch calendar events',
          message: (error instanceof Error) ? error.message : String(error)
        })
      };
    }
  }

  else if (event.httpMethod === 'POST') {
    try {
      const eventData = JSON.parse(event.body || '{}');
      
      if (!eventData.summary) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Event summary is required' })
        };
      }

      const url = `${baseUrl}/events?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create event: ${JSON.stringify(errorData)}`);
      }

      const createdEvent = await response.json();
      
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Event created successfully',
          event: createdEvent
        })
      };
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to create calendar event',
          message: (error instanceof Error) ? error.message : String(error)
        })
      };
    }
  }

  else if (event.httpMethod === 'DELETE') {
    try {
      const { eventId } = JSON.parse(event.body || '{}');
      
      if (!eventId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Event ID is required' })
        };
      }

      const url = `${baseUrl}/events/${eventId}?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete event: ${errorData}`);
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Event deleted successfully',
          eventId: eventId
        })
      };
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to delete calendar event',
          message: (error instanceof Error) ? error.message : String(error)
        })
      };
    }
  }

  else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
}
//https://pta-calendar-testing.netlify.app/.netlify/functions/calendarWebhook