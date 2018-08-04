#!/bin/bash

# gickhub
# a shell script to get gm imagemagick docs
# in a more usable way
HTML_FILE='imagemagick.html'
TEXT_FILE='imagemagick.txt'
PREFIX='doc'
DOC_NAMES=()
URL='http://www.graphicsmagick.org/GraphicsMagick.html'
i=0
wget $URL -O $HTML_FILE
cat $HTML_FILE | html-to-text > $TEXT_FILE
csplit -f $PREFIX $TEXT_FILE /^.*triangle_option.*/ {*}
perl -pi -e 's/^[ \t]+|[ \t]+$//g' $PREFIX*
DOC_FILE=$PREFIX*

for f in $DOC_FILE
  do
  ((i++))
  DOC_NAMES[$i]=$(head -1 $f | grep -o '[-].*$')
  done

echo $DOC_NAMES
