# roles:check

```json
{
    "createdAt": "2023-07-03T08:43:27.000Z",
    "updatedAt": "2023-07-03T08:43:27.000Z",
    "nickname": "Super Admin",
    "id": 1,
    "phone": null,
    "appLang": null,
    "email": "admin@nocobase.com",
    "createdById": null,
    "systemSettings": {},
    "updatedById": null,
    "roles": [
        {
            "createdAt": "2023-07-03T08:43:27.000Z",
            "updatedAt": "2023-07-03T08:43:27.000Z",
            "hidden": false,
            "name": "admin",
            "allowNewMenu": true,
            "snippets": [
                "pm",
                "pm.*",
                "ui.*"
            ],
            "title": "{{t(\"Admin\")}}",
            "strategy": {
                "actions": [
                    "create",
                    "view",
                    "update",
                    "destroy"
                ]
            },
            "description": null,
            "allowConfigure": true,
            "default": false,
            "rolesUsers": {
                "createdAt": "2023-07-03T08:43:28.000Z",
                "updatedAt": "2023-07-03T08:43:28.000Z",
                "default": null,
                "userId": 1,
                "roleName": "admin"
            }
        },
        {
            "createdAt": "2023-07-03T08:43:27.000Z",
            "updatedAt": "2023-07-03T08:43:27.000Z",
            "hidden": false,
            "name": "member",
            "allowNewMenu": true,
            "snippets": [
                "!pm",
                "!pm.*",
                "!ui.*"
            ],
            "title": "{{t(\"Member\")}}",
            "strategy": {
                "actions": [
                    "view",
                    "update:own",
                    "destroy:own",
                    "create"
                ]
            },
            "description": null,
            "allowConfigure": null,
            "default": true,
            "rolesUsers": {
                "createdAt": "2023-07-03T08:43:28.000Z",
                "updatedAt": "2023-07-03T08:43:28.000Z",
                "default": null,
                "userId": 1,
                "roleName": "member"
            }
        },
        {
            "createdAt": "2023-07-03T08:43:27.000Z",
            "updatedAt": "2023-07-03T08:43:27.000Z",
            "hidden": true,
            "name": "root",
            "allowNewMenu": null,
            "snippets": [
                "pm",
                "pm.*",
                "ui.*"
            ],
            "title": "{{t(\"Root\")}}",
            "strategy": null,
            "description": null,
            "allowConfigure": null,
            "default": false,
            "rolesUsers": {
                "createdAt": "2023-07-03T08:43:28.000Z",
                "updatedAt": "2023-07-03T08:43:28.000Z",
                "default": true,
                "userId": 1,
                "roleName": "root"
            }
        }
    ]
}
```

# auth:check

```json
{
    "role": "root",
    "strategy": {
        "allowConfigure": null
    },
    "actions": {},
    "snippets": [
        "pm",
        "pm.*",
        "ui.*"
    ],
    "availableActions": [
        "create",
        "view",
        "update",
        "destroy",
        "export",
        "importXlsx"
    ],
    "resources": [],
    "actionAlias": {
        "get": "view",
        "list": "view",
        "update": "update",
        "move": "update"
    },
    "allowAll": true,
    "allowConfigure": null,
    "allowMenuItemIds": [],
    "allowAnonymous": false
}

```
