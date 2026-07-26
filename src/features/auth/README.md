# Auth Module API Contract

This directory isolates the Authentication feature (Login, Register, Session Management).

## Structure
- `components/`: UI strictly related to Auth (Forms).
- `hooks/`: Local state or React Query hooks (e.g., `useLogin`).
- `services/`: Business logic.
- `repositories/`: Axios endpoints for Auth.
- `types.ts`: Domain models (User, Token).

## Backend Integration Required

### POST /auth/login
Authenticate user and return JWT.

**Expected Payload**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "token": "jwt_string_here",
    "user": {
      "id": "u1",
      "name": "Jane Doe",
      "email": "user@example.com",
      "role": "customer"
    }
  }
}
```

### POST /auth/register
Register a new user account.
