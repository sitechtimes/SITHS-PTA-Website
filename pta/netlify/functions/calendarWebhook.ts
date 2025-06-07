import { google } from 'googleapis';

export async function handler(event: any, context: any) {
  try {
    const calendarId = '6451dd61d5cf381222e6f6c765ac5e326847743184a91af0f854ca6fd3920764@group.calendar.google.com';
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
  const serviceAccountCredentials = {
    client_email: "test-19@calendar-test-459216.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdhLuJP7L4Kygm\nd5zEzPf/waUdlj1RAfRP2N+MofJf4m3HbT2MyZGehHVVYnWc8QXaGb2zOgCNPSF0\nQWvntWCYWBO/xsqTXBxnsAMk1+k6kmbmYetHk0IT2KpPhtggcVp+EtVMekfiYnGv\nH+p37ZzqaiWNXjQ0S6vM6AAv44VIN+wYHQC3H1yNFjMBNtkrIzZ6XmGaNN3GIy0d\nySIwauyYt1Ypn3bn9kSnra96a4926BPZBZamOQxX/tnX7ONWHEOk/CEl2SveNDCU\nCZAi9SBxPuFREmwtgsXFvzMzzFiizhR2/FcJ8FkjgZgp8n4RBKCsYE0SiU6VsHGt\no8mbWhH/AgMBAAECggEAEJe5qG0yDa7F4iPBhWhJB0pNAOtZCnFYCIcZL6KN0irW\nyEJhguMyWipX0559atUO+ChHcl5c3jd/AwNHfuKyKpcmW44bbHBQ3F9tzNuzZ6TB\num4JPqJEJ9Jp520VUVDMU3c7rO/X5Jg1JcYBPRx6TYDH8U/mHyiv5LhYEz46pI8Q\nE4vffVcwUBFap1u3fr1VZT8XNWVhByXK5DDNBfxHjURbMEt1HzpPOpxyGWUoMpz7\n7iDh8lqcIg+HXCD8IA0lVki89N/bVxw/H8KVKRRHcJnjhsu9c30nO6itvA6S2GKe\ntR+uc+OVeTy4tpaBAcH3a+iEUPDMiVkfJiTgzVAU2QKBgQD5/97A6sJmpr4viv9N\nYUtyn4GwMuDX84BqZbpCPzVuTH3F3qlrDi9XRjycgnVlIjO4BIUhJbPwfodyEnZP\nRaSrN56AvVWTvRbK2cPk4Zhll/e+83FvemsC0zosAvoAM1Lcbqj4nZejWkLswe3w\neZ27Wv/rEBu/tXUO1IAsryDSzQKBgQDi1dwnpGGsCxL7jNSTHh/usPYDg1qSSPiz\nSKGp0pTl8RKwVKCNWnVk9nLcvegAhO7XeEKAfj+e6tmHLtatCrd1NEIvAQ9Xuhb4\nhuup6sWTHgugHRtDjuwF3UyvwByBsASFzNr6hyY1+lvtg+f/Gzx9PBpVuweiRIhV\nESVWMtbv+wKBgG6BjMxHuSC46e6ICWwB6uDC4weopbyvVP8y8k8gM5UK2LmjP84j\nmgeA83/XJt9KbAQWc2aAjPZsZ6Cjyool5bENR9HuXyqL9cw60B2XHs8hipBseaLm\nQPEhv1/+/NUj2qe3fpdOyd2aI2UWIAAhMfjEM8WK/EkUg6bHhdS6oM6tAoGAPIMG\nnwCoGag+oSJ5luGDbT6B8n/5CmszBUjL76zAkfLUpHt+9RZ7mLpx+9cha/oKaSqo\nuvRy7mcCLqDdHf5s4HRXb4id2i5HcHc1qPd7S3rJaSY6nrQi3JGjooLiV+pn2nXC\nuPCSzfWCzoLQweo3IcWF1Pb221/i6qaPSkZ3tj8CgYEAjGtvsxsMQ1gv3xe/c08n\n243dj+Nn3xGKSoQ0MnfCYniLkFP1ZUIMnZk8uycptKEEIjvNJAwf6M6z2EX1E+QM\nCngyBAGaEiwSB5bgHS/adDIco88zmz7bA5hjcng1PetR8BHhajmT1NU9smJl65Bn\nDuphimLVvFR5dYrsVkjQUEY=\n-----END PRIVATE KEY-----\n"
  };

  const auth = new google.auth.JWT({
    email: serviceAccountCredentials.client_email,
    key: serviceAccountCredentials.private_key,
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