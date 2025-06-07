export async function handler(event: any, context: any) {
  const calendarId = '6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com';
  const apiKey = 'AIzaSyDVFq2-peB2fQA3Oiezt-ihZqzII49pWAU';
  const baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`;

  if (event.httpMethod === 'POST') {
    try {
      const sanityEventData = JSON.parse(event.body || '{}');
      console.log('Received Sanity event data:', sanityEventData);

      let descriptionText = '';
      if (sanityEventData.description && Array.isArray(sanityEventData.description)) {
        descriptionText = sanityEventData.description
          .map(block => {
            if (block._type === 'block' && Array.isArray(block.children)) {
              return block.children
                .filter(child => child._type === 'span')
                .map(span => span.text)
                .join('');
            }
            return '';
          })
          .filter(text => text)
          .join('\n\n');
      }

      const startDate = new Date(sanityEventData.date);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1);

      const googleCalendarEvent = {
        summary: sanityEventData.title,
        description: descriptionText,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: 'America/New_York'
        },
        extendedProperties: {
          private: {
            sanityId: sanityEventData._id
          }
        }
      };
      
      const url = `${baseUrl}/events?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(googleCalendarEvent)
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
      const sanityData = JSON.parse(event.body || '{}');
      const sanityId = sanityData._id;
      
      if (!sanityId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Sanity event ID is required' })
        };
      }

      const searchUrl = `${baseUrl}/events?privateExtendedProperty=sanityId=${sanityId}&key=${apiKey}`;
      const searchResponse = await fetch(searchUrl);
      
      if (!searchResponse.ok) {
        throw new Error(`Failed to find event with Sanity ID: ${sanityId}`);
      }
      
      const searchResult = await searchResponse.json();
      
      if (!searchResult.items || searchResult.items.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'No matching Google Calendar event found' })
        };
      }

      const googleEventId = searchResult.items[0].id;

      const deleteUrl = `${baseUrl}/events/${googleEventId}?key=${apiKey}`;
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.text();
        throw new Error(`Failed to delete event: ${errorData}`);
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Event deleted successfully',
          sanityId: sanityId,
          googleEventId: googleEventId
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