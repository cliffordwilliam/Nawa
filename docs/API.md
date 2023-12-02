# API documentation

## Post - base/auth/register

### Request body

- username:Ryoko
- password:ryoko
- role: 1

### Response 201

```json
{
    "msg": "Success register",
    "user": {
        "username": "Ryoko",
        "role": 1,
        "reputation_score": 0
    }
}
```

### Response 400 - posting the same username again

```json
{
    "msg": "username must be unique"
}
```

### Response 400 - username is empty

```json
{
    "msg": "username required"
}
```

### Response 400 - password is empty

```json
{
    "msg": "password required"
}
```

### Response 400 - role is empty

```json
{
    "msg": "role required"
}
```

## Post - base/auth/login

### Request body

- username:Ryoko
- password:ryoko

### Response 200

```json
{
    "msg": "Success login",
    "token": "tokenGoesHere"
}
```

### Response 400 - username is empty

```json
{
    "msg": "username required"
}
```

### Response 400 - password is empty

```json
{
    "msg": "password required"
}
```

### Response 401 - username is not in database

```json
{
    "msg": "unauthorized"
}
```

### Response 401 - password is wrong

```json
{
    "msg": "wrong password"
}
```