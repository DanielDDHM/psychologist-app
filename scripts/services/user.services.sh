#!/bin/sh

create(){
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
    echo "zipcode"
    read ZIPCODE
    echo "StreetNumber"
    read STREETNUMBER

    module="USERS"
    type="CREATE"
    address='{"zipCode":"'$ZIPCODE'","streetNumber":"'$STREETNUMBER'"}'
    body='{"name":"'$NAME'","email":"'$EMAIL'","password":"'$PASSWORD'","photo":"'$PHOTO'","phone":"'$PHONE'","birthdate":"'$BIRTHDATE'"}'

    clear
    npx ts-node-dev --exit-child --transpile-only --ignore-watch node_modules run-func ./scripts/functionCall.service.ts cb $module $type $body $address
}

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
clear
case "$response" in
    [1])
        create
        ;;
esac
