#!/bin/bash

srcdir=".git-hooks"
dstdir=".git/hooks"

for srcfile in ${srcdir}/*
do
    dstfile=$(basename $srcfile)
    cp $srcfile $dstdir/$dstfile
    chmod +x $dstdir/$dstfile
done