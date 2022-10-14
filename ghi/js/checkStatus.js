// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload')
console.log(payloadCookie)

if (payloadCookie) {

  console.log(payloadCookie.value)


  // The cookie value is a JSON-formatted string, so parse it
  // const encodedPayload = JSON.parse(payloadCookie.value);

// Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value)

// The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload)

// Print the payload
  console.log(payload);

  // Check if "events.add_conference" is in the permissions.

  const permissions = payload.user.perms;

  if (permissions.includes('events.add_conference')) {

    const locationTag = document.getElementById("newlocation")
    locationTag.classList.remove("d-none")
    const conferenceTag = document.getElementById("newconference")
    conferenceTag.classList.remove("d-none")
    const presentationTag = document.getElementById("newpresentation")
    presentationTag.classList.remove("d-none")


  }
//   // If it is, remove 'd-none' from the link
}

//   // Check if "events.add_location" is in the permissions.
//   // If it is, remove 'd-none' from the link
