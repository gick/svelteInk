#!/bin/bash

# gickhub
# a shell script to get gm imagemagick docs
# in a more usable way
HTML_FILE='imagemagick.html'
TEXT_FILE='imagemagick.txt'
METHOD_LIST='METHOD_LIST'
PREFIX='doc'
DOC_REP='DOCS/'
DOC_NAME=()
DOC_FIRST_LINE=()
URL='http://www.graphicsmagick.org/GraphicsMagick.html'
touch $METHOD_LIST
wget $URL -O $HTML_FILE
cat $HTML_FILE | html-to-text > $TEXT_FILE
csplit -f $PREFIX $TEXT_FILE /^.*triangle_option.*/ {*}
perl -pi -e 's/^[ \t]+|[ \t]+$//g' $PREFIX*
DOC_FILE=$PREFIX*
i=0
for f in $DOC_FILE
do
  ((i++))
  DOC_FIRST_LINE[$i]=$(head -1 $f | grep -o '[-].*$')
  DOC_NAME[$i]=$(echo ${DOC_FIRST_LINE[$i]} | grep -o '[[:alpha:]]*' | head -n 1)
  if [ ! -z "${DOC_NAME[$i]}"]
  then
    echo ${DOC_NAME[$i]}>>$METHOD_LIST
    touch ${DOC_NAME[$i]}
    echo ${DOC_FIRST_LINE[$i]} >> ${DOC_NAME[$i]}
    tail -n +2 $f >> ${DOC_NAME[$i]}
    mv ${DOC_NAME[$i]} $DOC_REP
  fi
  rm $f
done
mv $METHOD_LIST $DOC_REP
rm $HTML_FILE $TEXT_FILE
