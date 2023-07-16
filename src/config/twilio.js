import twilio from 'twilio'
import { option } from './option.js'

const twilioID = option.twilio.twilioID
const twilioToken = option.twilio.twilioToken
export const twilioPhone = option.twilio.twilioPhone

export const twilioClient = twilio(twilioID, twilioToken);