#!/bin/sh
# https://www.shellcheck.net/
# usage: 
# ./td.sh "text" - adds task to today list in teuxdeux
# create aliases in .zshrc
# 

if [ $# -ne 1 ]; then
        echo "🤦‍♀️ You need to actually write something!"
		exit 1
fi

if [ "$1" = "a" ]; then 
    node cli/index.js $2
else 
    node "${BASH_SOURCE%/*}/setup-session.js"
fi


# if [ ! -z "$taskText"  ]; then 
#     echo "$taskText" >> "$DRAFTS_INBOX_LOCATION"/test.md
#     echo "🎉  Draft created (I hope)"
#     open /Applications/Drafts.app 
# else 
#     echo "🤦‍♀️ Trying to add an empty string"
# fi