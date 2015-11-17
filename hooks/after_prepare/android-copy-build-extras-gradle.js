#!/usr/bin/env node
 
//
// This hook copies build-extras.gradle from root to platforms/android
//

var tag = "AFTER_PREPARE (android - copy build-extras.gradle)";
var fs = require('fs');
var path = require('path');

// Only run this hook when preparing an Android project.
if (process.env.CORDOVA_PLATFORMS.split(/[,@]/).indexOf("android") == -1) {
    return;
}

var rootdir = process.argv[2];
var destdir = path.join(rootdir, "platforms/android");
var filename = "build-extras.gradle";
var srcfile = path.join(rootdir, filename);
var destfile = path.join(destdir, filename);

if (!fs.existsSync(srcfile)) {
    console.log("--ERROR-- in " + tag + " " + srcfile + " is missing");
    return;
} 

if (!fs.existsSync(destdir)) {
    console.log("--ERROR-- in " + tag + ": " + destdir + " is missing");
    return;
}

try {
    fs.createReadStream(srcfile).pipe(
        fs.createWriteStream(destfile));
} catch(e) {
    console.log("--ERROR-- in " + tag + ": " + e.message);
    return;
}

console.log("completed " + tag);