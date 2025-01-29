import io from 'socket.io-client'

const URL = process.env['NEXT_PUBLIC_SOCKET_URL']
console.log('🚀 ~ URL:', URL)

export const socket = io(`${URL}/message`, {
  reconnectionDelayMax: Number(process.env['NEXT_PUBLIC_RECONNECTION_DELAY_MAX']),
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMGUyNjA4OS03MDNhLTRhOGMtYmYzNi00NTA0OGNjZWQ0ZTIiLCJlbWFpbCI6InRAdC5jb20iLCJpYXQiOjE3MzIwMzQ2OTEsImV4cCI6MTczMzMzMDY5MX0.FsABEn0_ZKG8aT6nJQ-XIJnw4XNmw6sskdOmRYB-sJs',
  },
})
