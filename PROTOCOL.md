# Protocol for websocket server interface

The server sends/expects the following three messages.
- `register` Called by client to register
- `update`   Called by client to update status
- `status`   Called by server to with updated status

## Register call
The register call should be called by the client right after
the client has connected to the server through websocket.
In this call the client can set up the display name for the
robot.

Format:

```
{
  "type": "register",
  "name": "Robot Name"
}
```

## Update call
While playing a round, each robot should call update each
time it moves to a board piece with a new color. The valid
value for the color property is defined in the color section.

Format:

```
{
  "type": "update",
  "color": "RED"
}
```

## Status call
Right after the server receives an update call from one of
the robots it will call status on each of the robots with
the updated game state. This state contains the current
color of each robot. The valid value for the color property
is defined in the color section.

Format:

```
{
  "type": "status",
  "status": [
    "RED",    // You
    "BLUE",   // Teammate
    "BLACK",  // Opponent #1
    "WHITE"   // Opponent #2
  ]
}
```

## Colors
The following are the set of valid colors:
- RED
- BLUE
- GREEN
- WHITE
- BROWN
- BLACK
- YELLOW
