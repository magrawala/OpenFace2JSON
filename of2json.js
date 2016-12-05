"use strict";

// Usage: node of2json.js path
// path should be to directory containing files created by
// FaceLandmarkImg from OpenFace/bin/FaceLandmarkImg


var fs = require("fs");
var path = process.argv[2];

var files=fs.readdirSync(path);
//console.log(files);

//Make an array of the files ending in .pts
var ptsFiles = [];
for (var i in files) {
    // If the filename ends in .pts then add to ptsFiles array;
    var regexp = new RegExp('.*\.pts','i');
    if (regexp.test(files[i])){
	ptsFiles.push(files[i]); 
    }
}

//Loop over the ptsFiles and find all the .pts files for a single frame
//then construct results object
var result = {result: []};
var ind = ptsFiles[0].indexOf('_det');
var frameRootName = ptsFiles[0].substring(0,ind);
var prevFrameRootName = frameRootName;
for (var i in ptsFiles) {
    //Construct object for face in openFaceFile to result object
    var currFaceObj = {generatedBy: "OpenFace"};

    // Read in the openFace .pts file
    var fname = path + ptsFiles[i];
    var openFaceFile = fs.readFileSync(fname,"utf-8");

    //Construct landmark pts object
    var outLPts = {landmark: {}};
    var landmarkPtsStartIdx = openFaceFile.indexOf("{");
    var landmarkPtsEndIdx = openFaceFile.indexOf("}");
    // +2 on start is to get past the "{" and the newline.
    // -1 on end is to remove the newline at the end.
    var landmarkPts = openFaceFile.substring(landmarkPtsStartIdx+2,
					     landmarkPtsEndIdx-1);
    var lPts = landmarkPts.split(/\n/);
    if (lPts.length != 68) {throw("Wrong landmarkPts length");}

    //Save minBBoxPt and maxBBoxPt 
    var minPt = {face_minBBox: {x: 100000, y:100000}};
    var maxPt = {face_maxBBox: {x: 0, y:0}};
    
    //Based on https://github.com/TadasBaltrusaitis/OpenFace/wiki/Output-Format
    //Pts 0 - 16 are on the face contour 
    for (var idx = 0; idx < 17; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "contour_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 17-21 are left eyebrow
    for (var idx = 17; idx < 22; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "left_eyebrow_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 22-26 are right eyebrow,
    for (var idx = 22; idx < 27; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "right_eyebrow_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 27-30 are nose centerline,
    for (var idx = 27; idx < 31; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "nose_centerline_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 31 - 35 are nose bottom
    for (var idx = 31; idx < 36; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "nose_bottom_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 36-41 are left eye
    for (var idx = 36; idx < 42; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "left_eye_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 42-47 are right eye
    for (var idx = 42; idx < 48; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "right_eye_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 48-53 are upper lip top 
    for (var idx = 48; idx < 54; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "mouth_upper_lip_top_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 54-59 are lower lip bottom
    for (var idx = 54; idx < 60; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "mouth_lower_lip_bottom_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 60-63 are upper lip bottom 
    for (var idx = 60; idx < 64; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "mouth_upper_lip_bottom_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    //Pts 64-67 are lower lip bottom
    for (var idx = 64; idx < 68; idx++) {
	var currPt = lPts[idx].split(" ");
	var ptName = "mouth_lower_lip_top_" + idx;
	outLPts.landmark[ptName] = new Object();
	outLPts.landmark[ptName].x = currPt[0];
	outLPts.landmark[ptName].y = currPt[1];
	if (currPt[0] < minPt.face_minBBox.x) minPt.face_minBBox.x = currPt[0];
	if (currPt[1] < minPt.face_minBBox.y) minPt.face_minBBox.y = currPt[1];
	if (currPt[0] > maxPt.face_maxBBox.x) maxPt.face_maxBBox.x = currPt[0];
	if (currPt[1] > maxPt.face_maxBBox.y) maxPt.face_maxBBox.y = currPt[1];
    }
    currFaceObj.landmark = outLPts.landmark; 
    currFaceObj.face_minBBox = minPt.face_minBBox;
    currFaceObj.face_maxBBox = maxPt.face_maxBBox;
    
    //Construct pose object
    var outPose = {pose: {eul_x:0, eul_y:0, eul_z:0}};
    var posePtsStartIdx = openFaceFile.indexOf("{",landmarkPtsEndIdx+1);
    var posePtsEndIdx = openFaceFile.indexOf("}",landmarkPtsEndIdx+1);
    // +2 on start is to get past the "{" and the newline.
    // -1 on end is to remove the newline at the end.
    var posePts = openFaceFile.substring(posePtsStartIdx+2,
					 posePtsEndIdx-1);
    var pPt = posePts.split(" ");
    if (pPt.length != 3) {throw("Wrong posePt length");}
    outPose.pose.eul_x = pPt[0];
    outPose.pose.eul_y = pPt[1];
    outPose.pose.eul_z = pPt[2];
//    console.log(outPose);
    currFaceObj.pose = outPose.pose;
    
    //Construct gaze object
    var outGaze = {gaze: {}};
    var gazePtsStartIdx = openFaceFile.indexOf("{",posePtsEndIdx+1);
    var gazePtsEndIdx = openFaceFile.indexOf("}",posePtsEndIdx+1);
    // +2 on start is to get past the "{" and the newline.
    // -1 on end is to remove the newline at the end.
    var gazePts = openFaceFile.substring(gazePtsStartIdx+2,
					 gazePtsEndIdx-1);
    var gazePt = gazePts.split(" ");
    if (gazePt.length != 6) {throw("Wrong gazePt length");}
    outGaze.gaze = new Object();
    outGaze.gaze["left_eye"] = new Object;
    outGaze.gaze["right_eye"] = new Object;
    outGaze.gaze.left_eye["dir_x"] = gazePt[0];
    outGaze.gaze.left_eye["dir_y"] = gazePt[1];
    outGaze.gaze.left_eye["dir_z"] = gazePt[2];
    outGaze.gaze.right_eye["dir_x"] = gazePt[3];
    outGaze.gaze.right_eye["dir_y"] = gazePt[4];
    outGaze.gaze.right_eye["dir_z"] = gazePt[5];
//    console.log(outGaze);
    currFaceObj.gaze = outGaze.gaze;
    
    //Construct au intensitities
    var outAUInt = {au_intensities: {}};

    var auIntPtsStartIdx = openFaceFile.indexOf("{",gazePtsEndIdx+1);
    var auIntPtsEndIdx = openFaceFile.indexOf("}",gazePtsEndIdx+1);
    // +2 on start is to get past the "{" and the newline.
    // -1 on end is to remove the newline at the end.
    var auIntPts = openFaceFile.substring(auIntPtsStartIdx+2,
					 auIntPtsEndIdx-1);
    var auIPts = auIntPts.split("\n");
    outAUInt.au_intensitites = new Object();
    for (var idx in auIPts) {
	var currPt = auIPts[idx].split(" ");
	outAUInt.au_intensities[currPt[0]] = currPt[1];
    }
//    console.log(outAUInt);
    currFaceObj.au_intensities = outAUInt.au_intensities;
    
    //Construct au occurences
    var outAUOcc = {au_occurences: {}};

    var auOccPtsStartIdx = openFaceFile.indexOf("{",auIntPtsEndIdx+1);
    var auOccPtsEndIdx = openFaceFile.indexOf("}",auIntPtsEndIdx+1);
    // +2 on start is to get past the "{" and the newline.
    // -1 on end is to remove the newline at the end.
    var auOccPts = openFaceFile.substring(auOccPtsStartIdx+2,
					  auOccPtsEndIdx-1);
    var auOPts = auOccPts.split("\n");
    outAUOcc.au_occurences = new Object();
    for (var idx in auOPts) {
	var currPt = auOPts[idx].split(" ");
	outAUOcc.au_occurences[currPt[0]] = currPt[1];
    }
//    console.log(outAUOcc);
    currFaceObj.au_occurences = outAUOcc.au_occurences;


    //Construct the result for each frame (handles multiple faces in frame)
    var ind = ptsFiles[i].indexOf('_det');
    var frameRootName = ptsFiles[i].substring(0,ind);
    if(frameRootName != prevFrameRootName) {
	//Write out the old result to a JSON file
	var outFileName = path + prevFrameRootName + "_landmarks.json";
	console.log(outFileName);
	fs.writeFileSync(outFileName, JSON.stringify(result, null, "   "));
	
	//Empty the result and update prevFrameRootName
	result = {result: []};
	prevFrameRootName = frameRootName;
    }

    result.result.push(currFaceObj);
}
    
//Write out the old result to a JSON file
var outFileName = path + prevFrameRootName + "_landmarks.json";
console.log(outFileName);
fs.writeFileSync(outFileName, JSON.stringify(result, null, "   "));




