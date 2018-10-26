#/bin/bash

source ~/.slideshow.conf

eval DEPLOYMENT_DIR=$DEPLOYMENT_DIR

STAGING=/tmp/slideshow.js

json_array() {
    echo -n '['
    while [ $# -gt 0 ]; do
        x=${1//\\/\\\\}
        echo -n \"${x//\"/\\\"}\"
        [ $# -gt 1 ] && echo -n ', '
        shift
    done
    echo ']'
}

generateJson(){
    array=(`ls $STAGING/images`)
    OUTPUT=$STAGING/images/images.json
    touch $OUTPUT
    json_array "${array[@]}" > $OUTPUT
}

update(){
    mkdir -p $STAGING
    git clone https://github.com/gbourant/slideshow.js $STAGING/
    mkdir $STAGING/images
    git clone $IMAGE_REPO $STAGING/images/
    generateJson
    rm -rf $DEPLOYMENT_DIR
    mkdir -p $DEPLOYMENT_DIR
    cp -r $STAGING/* $DEPLOYMENT_DIR
    \cp -r $STAGING/* `dirname "$0"`
    rm -rf $STAGING
}

update