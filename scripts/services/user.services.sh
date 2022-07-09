#!/bin/sh
echo "Select OPERATION [
    1 - Create
    2 - Update
    3 - Delete
    4 - Make Admin
    5 - Activate/Deactivate
    6 - Confirm
    7 - Get 
]:"
read  response
case "$response" in
    [1])
        echo "First Param: NAME"
        read NAME
        echo "Second param: EMAIL"
        read EMAIL
        echo "Third Param: PASSWORD"
        read PASSWORD
        echo "Fourth Param: PHOTO"
        read PHOTO
        echo "Firth Param: PHONE"
        read PHONE
        echo "Sixth Param: BIRTHDATE"
        read BIRTHDATE
        echo "Last Param ADDRESS"
        read ADDRESS

        body='{"name":"'$NAME'","email":"'$EMAIL'","password":"'$PASSWORD'","photo":"'$PHOTO'","phone":"'$PHONE'","birthDate":"'$BIRTHDATE'","address":"'$ADDRESS'"}'

        npx run-func ./src/services/users.service.ts UsersService.create "$body"
        ;;
esac
