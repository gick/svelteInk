#!/bin/bash

# gickhub
# a shell script to get gm imagemagick docs
# in a more usable way


PREFIX='doc'
DOC_NAMES=()

DOC_FILE=$PREFIX*

for f in $DOC_FILE
  do
  ((i++))
  DOC_NAMES[$i]=$(head -1 $f | grep -o '[-].*$')
  done
echo "d"
echo ${DOC_NAMES[@]}
