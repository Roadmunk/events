#!/bin/sh

cd $1
mkdir -p dist
docker run --rm -v $(pwd):$(pwd) -w $(pwd) znly/protoc --descriptor_set_out=dist/descriptors.msg --js_out=import_style=commonjs,binary:dist -I. *.proto