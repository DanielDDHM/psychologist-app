#!/bin/sh
echo "Welcome to Prompt test Psy-app" 
echo "To start Press Enter:"
read T

echo "Select Service [
    1 - User
    2 - Psy
    3 - Pat
    4 - Lib
    5 - diag
    6 - cons
    7 - chat 
]:"
read  response
case "$response" in
    [1])
        sh ./scripts/services/user.services.sh
        ;;
    [2])
        sh ./scripts/services/psy.services.sh
        ;;
    [3])
        sh ./scripts/services/pat.services.sh
        ;;
    [4])
        sh ./scripts/services/lib.services.sh
        ;;
    [5])
        sh ./scripts/services/diag.services.sh
        ;;
    [6])
        sh ./scripts/services/cons.services.sh
        ;;
    [7])
        sh ./scripts/services/chat.services.sh
        ;;
esac
